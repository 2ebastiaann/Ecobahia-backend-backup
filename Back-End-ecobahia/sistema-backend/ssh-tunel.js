require('dotenv').config();
const { Client } = require('ssh2');
const net = require('net');

const sshClient = new Client();

const tunnelConfig = {
    host: process.env.SSH_HOST,
    port: parseInt(process.env.SSH_PORT, 10) || 22,
    username: process.env.SSH_USER,
    password: process.env.SSH_PASSWORD
};

const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 5433, // Puerto local donde la app se conectará
    dstHost: process.env.DB_HOST || 'localhost',
    dstPort: parseInt(process.env.DB_PORT, 10) || 5432
};

function connectToPgSSH() {
    return new Promise((resolve, reject) => {
        sshClient.on('ready', () => {
            console.log('✅ Conexión SSH establecida');

            const server = net.createServer((socket) => {
                sshClient.forwardOut(
                    forwardConfig.srcHost,
                    forwardConfig.srcPort,
                    forwardConfig.dstHost,
                    forwardConfig.dstPort,
                    (err, stream) => {
                        if (err) {
                            console.error('❌ Error forwarding:', err);
                            socket.end();
                            return;
                        }
                        socket.pipe(stream).pipe(socket);
                    }
                );
            });

            server.listen(forwardConfig.srcPort, forwardConfig.srcHost, () => {
                console.log(`🔗 Puente local escuchando en ${forwardConfig.srcHost}:${forwardConfig.srcPort}`);
                resolve();
            });

        }).on('error', (err) => {
            console.error('❌ Error SSH:', err);
            reject(err);
        }).connect(tunnelConfig);
    });
}

module.exports = connectToPgSSH;
