const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Registro
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Validación de campos requeridos
  if (!username) {
    return res.status(400).send('Username is required');
  }
  if (!password) {
    return res.status(400).send('Password is required');
  }

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Hash de la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear y guardar el usuario
  const user = new User({ username, password: hashedPassword, role });
  await user.save();

  // Generar un JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role }, // Payload (datos del usuario)
    process.env.JWT_SECRET, // Clave secreta (debe estar en tus variables de entorno)
    { expiresIn: '24h' } // Opciones (tiempo de expiración)
  );

  // Devolver el token y un mensaje de éxito
  res.status(200).json({ message: 'User registered successfully', token });
});


// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).send('Username or Password is wrong');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ id: user.id, role: user.role, username:username }, process.env.JWT_SECRET);
  res.header('Authorization', token).send(token);
});

module.exports = router;
