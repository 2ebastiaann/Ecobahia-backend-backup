const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Horario = sequelize.define('horarios', {
  id_horarios: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  rutas_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  dia_semana: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    unique: true
  },
  horario_inicio_plan: {
    type: DataTypes.TIME,
    allowNull: false,
    unique: true
  },
  ventana_min: {
    type: DataTypes.SMALLINT,
    allowNull: true
  }
}, {
  tableName: 'horarios',
  timestamps: false
});

module.exports = Horario;
