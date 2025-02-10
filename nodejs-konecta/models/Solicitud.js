const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empleado = require('./Empleado');

const Solicitud = sequelize.define('Solicitud', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING, allowNull: false },
  resumen: { type: DataTypes.STRING, allowNull: false },
  id_empleado: { 
    type: DataTypes.INTEGER, 
    references: {
      model: Empleado,
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'Solicitudes',
  timestamps: false
});

module.exports = Solicitud;