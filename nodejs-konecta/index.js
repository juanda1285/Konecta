const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const empleadoRoutes = require('./routes/empleado');
const solicitudRoutes = require('./routes/solicitud');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/empleado', empleadoRoutes);
app.use('/solicitud', solicitudRoutes);

const PORT =  3001;

sequelize.sync().then(() => {
  // Iniciar el servidor solo si no estamos en el entorno de prueba
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}).catch(err => {
  console.log('Error connecting to the database', err);
});

module.exports = app;