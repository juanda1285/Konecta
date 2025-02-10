const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const { Op } = require('sequelize');

router.get('/', authenticateJWT, async (req, res) => {
  const { page = 1, limit = 10, nombre, salarioMin, salarioMax, fechaIngreso } = req.query;
  const offset = (page - 1) * limit;

  // Configuración de filtros
  const filters = {};
  if (nombre) {
    filters.nombre = { [Op.like]: `%${nombre}%` };
  }
  if (salarioMin) {
    filters.salario = { ...filters.SALARIO, [Op.gte]: parseFloat(salarioMin) };
  }
  if (salarioMax) {
    filters.salario = { ...filters.SALARIO, [Op.lte]: parseFloat(salarioMax) };
  }
  if (fechaIngreso) {
    filters.fecha_ingreso = fechaIngreso;
  }

  try {
    const empleados = await Empleado.findAndCountAll({
      where: filters,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    res.json({
      totalItems: empleados.count,
      totalPages: Math.ceil(empleados.count / limit),
      currentPage: parseInt(page),
      data: empleados.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employees', error });
  }
});

router.post('/', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  const { fecha_ingreso, nombre, salario } = req.body;
  const empleado = new Empleado({ fecha_ingreso, nombre, salario });
  await empleado.save();
  res.status(200).json({ message: 'Empleado creado exitosamente' });
});


router.delete('/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  const { id } = req.params;
  await Empleado.destroy({ where: { id } });
  res.send('Empleado deleted successfully');
});
module.exports = router;