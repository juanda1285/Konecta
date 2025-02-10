const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,      // konecta
  process.env.DB_USER,      // postgres
  process.env.DB_PASSWORD,  // postgres
  {
    host: process.env.DB_HOST, // db
    port: process.env.DB_PORT, // 5432
    dialect: 'postgres',
  }
);

sequelize.authenticate()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error de conexión a PostgreSQL:', err));

module.exports = sequelize;