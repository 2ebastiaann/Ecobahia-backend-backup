// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const  usuarioControlador = require('../controlador/usuarios.controlador');
//POST /api/usuarios/register - Registrar un nuevo usuario
router.post('/register', usuarioControlador.registrarUsuario);

//POST /api/usuarios/login - Iniciar sesión de usuario
router.post('/login', usuarioControlador.logearUsuario);

module.exports = router;