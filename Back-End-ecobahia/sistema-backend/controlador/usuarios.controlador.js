// controlador/usuarios.controlador.js

const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ============================================
// Registrar usuario (Supabase)
// ============================================
exports.registrarUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const { data: existeUsuario, error: errorExiste } = await supabase
      .from('usuarios')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (errorExiste) throw errorExiste;

    if (existeUsuario) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear hash de contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar usuario en Supabase
    const { data: nuevoUsuario, error: errorInsert } = await supabase
      .from('usuarios')
      .insert({
        email: email,
        password_hash: hash
      })
      .select()
      .single();

    if (errorInsert) throw errorInsert;

    res.status(201).json({
      ok: true,
      usuario: {
        id_usuario: nuevoUsuario.id_usuario,  // UUID generado en Supabase
        email: nuevoUsuario.email,
        fecha_creacion: nuevoUsuario.fecha_creacion
      }
    });

  } catch (error) {
    console.error("❌ Error registrar usuario:", error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};


// ============================================
// Login usuario (Supabase)
// ============================================
exports.logearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    // Buscar usuario
    const { data: usuario, error: errorSelect } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (errorSelect) throw errorSelect;
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Validar contraseña
    const valido = await bcrypt.compare(password, usuario.password_hash);
    if (!valido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear token
    const token = jwt.sign(
      { id: usuario.id_usuario },
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
    console.error("❌ Error login:", error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
