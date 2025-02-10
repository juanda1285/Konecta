const express = require('express');
const router = express.Router();
const Solicitud = require('../models/Solicitud');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');

router.get('/', authenticateJWT, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const solicitudes = await Solicitud.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    res.json({
      totalItems: solicitudes.count,
      totalPages: Math.ceil(solicitudes.count / limit),
      currentPage: parseInt(page),
      data: solicitudes.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving requests', error });
  }
});

router.post('/', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  const { codigo, descripcion, resumen, id_empleado } = req.body;
  const solicitud = new Solicitud({ codigo, descripcion, resumen, id_empleado });
  await solicitud.save();
  res.send('Solicitud created successfully');
});

router.delete('/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  const { id } = req.params;
  await Solicitud.destroy({ where: { id } });
  res.send('Solicitud deleted successfully');
});

module.exports = router;