const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empleado = sequelize.define('Empleado', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fecha_ingreso: { type: DataTypes.DATE, allowNull: false },
  nombre: { type: DataTypes.STRING, allowNull: false },
  salario: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Empleado;