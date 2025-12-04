const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Barrio = sequelize.define('barrio', {
  id_barrio: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'barrios',
  timestamps: false
});

module.exports = Barrio;
