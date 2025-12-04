const {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo
} = require('../services/apiRecoleccion');

// GET todos
async function listarVehiculos(req, res) {
  try {
    const vehiculos = await obtenerVehiculos();
    res.json(vehiculos);
  } catch {
    res.status(500).json({ mensaje: 'Error al consultar vehículos' });
  }
}

// GET por id
async function mostrarVehiculoPorId(req, res) {
  try {
    const vehiculo = await obtenerVehiculoPorId(req.params.id);
    res.json(vehiculo);
  } catch {
    res.status(404).json({ mensaje: 'Vehículo no encontrado' });
  }
}

// POST crear
async function registrarVehiculo(req, res) {
  try {
    const nuevoVehiculo = await crearVehiculo(req.body);
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear vehículo', detalle: error.message });
  }
}

// PUT actualizar
async function editarVehiculo(req, res) {
  try {
    const vehiculoActualizado = await actualizarVehiculo(req.params.id, req.body);
    res.json(vehiculoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar vehículo', detalle: error.message });
  }
}

// DELETE eliminar
async function borrarVehiculo(req, res) {
  try {
    const resultado = await eliminarVehiculo(req.params.id);
    res.json({ mensaje: 'Vehículo eliminado', resultado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar vehículo', detalle: error.message });
  }
}

module.exports = { listarVehiculos, mostrarVehiculoPorId, registrarVehiculo, editarVehiculo, borrarVehiculo };