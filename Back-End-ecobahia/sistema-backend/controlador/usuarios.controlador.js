const Usuario = require('../maquetas/usuarios.maqueta');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    // Verificar si el email ya existe
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear hash de la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Crear usuario (sin id_rol)
    const nuevoUsuario = await Usuario.create({
      email,
      password_hash: hash
    });

    res.status(201).json({
      ok: true,
      usuario: {
        id_usuario: nuevoUsuario.id_usuario,
        email: nuevoUsuario.email,
        fecha_creacion: nuevoUsuario.fecha_creacion // si existe
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// Login usuario
exports.logearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(password, usuario.password_hash);
    if (!valido) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: usuario.id_usuario }, // sin rol
      process.env.JWT_SECRET || '12345fallback',
      { expiresIn: '2h' }
    );

    res.json({
      ok: true,
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
