const express = require('express');
const router = express.Router();
const { obtenerVehiculos } = require('../services/vehiculos.service');

router.get('/', obtenerVehiculos);

module.exports = router;
