// =======================
// CALLES
// =======================
async function obtenerCalles() {
  const response = await fetch('https://apirecoleccion.gonzaloandreslucio.com/api/calles');
  return response.json();
}

async function obtenerCallePorId(id) {
  const response = await fetch(`https://apirecoleccion.gonzaloandreslucio.com/api/calles/${id}`);
  if (!response.ok) {
    throw new Error(`Error al consultar calle con id ${id}`);
  }
  return response.json();
}

// =======================
// RUTAS
// =======================
async function obtenerRutas() {
  const res = await fetch('https://apirecoleccion.gonzaloandreslucio.com/api/v1/rutas');
  return res.json();
}

async function obtenerDetallesRuta(id) {
  const res = await fetch(`https://apirecoleccion.gonzaloandreslucio.com/api/v1/rutas/${id}`);
  if (!res.ok) throw new Error('Ruta no encontrada');
  return res.json();
}

async function crearRuta(datosRuta) {
  const res = await fetch('https://apirecoleccion.gonzaloandreslucio.com/api/v1/rutas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosRuta)
  });
  if (!res.ok) throw new Error('Error al crear ruta');
  return res.json();
}

// =======================
// VEHÍCULOS
// =======================
async function obtenerVehiculos() {
  const res = await fetch('https://apirecoleccion.gonzaloandreslucio.com/api/vehiculos');
  return res.json();
}

async function obtenerVehiculoPorId(id) {
  const res = await fetch(`https://apirecoleccion.gonzaloandreslucio.com/api/vehiculos/${id}`);
  if (!res.ok) throw new Error('Vehículo no encontrado');
  return res.json();
}

async function crearVehiculo(datosVehiculo) {
  const res = await fetch('https://apirecoleccion.gonzaloandreslucio.com/api/vehiculos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosVehiculo)
  });
  if (!res.ok) throw new Error('Error al crear vehículo');
  return res.json();
}

async function actualizarVehiculo(id, datosVehiculo) {
  const res = await fetch(`https://apirecoleccion.gonzaloandreslucio.com/api/vehiculos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosVehiculo)
  });
  if (!res.ok) throw new Error('Error al actualizar vehículo');
  return res.json();
}

async function eliminarVehiculo(id) {
  const res = await fetch(`https://apirecoleccion.gonzaloandreslucio.com/api/vehiculos/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar vehículo');
  return res.json();
}

// =======================
// RECORRIDOS
// =======================
async function iniciarRecorrido(datosRecorrido) {
  const res = await fetch('https://apirecoleccion.gonzaloandreslucio.com/api/recorridos/iniciar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosRecorrido)
  });
  if (!res.ok) throw new Error('Error al iniciar recorrido');
  return res.json();
}

async function finalizarRecorrido(id, datosFinalizacion) {
  const res = await fetch(`https://apirecoleccion.gonzaloandreslucio.com/api/recorridos/${id}/finalizar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosFinalizacion)
  });
  if (!res.ok) throw new Error('Error al finalizar recorrido');
  return res.json();
}

// =======================
// EXPORTACIÓN ÚNICA (IMPORTANTE)
// =======================
module.exports = {
  // Calles
  obtenerCalles,
  obtenerCallePorId,

  // Rutas
  obtenerRutas,
  obtenerDetallesRuta,
  crearRuta,

  // Vehículos
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,

  // Recorridos
  iniciarRecorrido,
  finalizarRecorrido
};
