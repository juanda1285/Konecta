const request = require('supertest');
const Empleado = require('../models/Empleado');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');

const app = require('../index')

jest.mock('../middleware/auth', () => ({
  authenticateJWT: (req, res, next) => next(),
  authorizeRoles: (role) => (req, res, next) => {
    req.user = { role };
    return next();
  }
}));

describe('API de Empleados', () => {
  describe('GET /empleados', () => {
    it('debería obtener la lista de empleados con paginación', async () => {
      Empleado.findAndCountAll = jest.fn().mockResolvedValue({
        count: 2,
        rows: [{ id: 1, nombre: 'Juan', salario: 1000, fecha_ingreso: '2023-01-01' }]
      });

      const response = await request(app).get('/empleado').query({ page: 1, limit: 10 });
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('debería filtrar empleados por nombre', async () => {
      Empleado.findAndCountAll = jest.fn().mockResolvedValue({ count: 1, rows: [{ nombre: 'Pedro' }] });
      const response = await request(app).get('/empleado').query({ nombre: 'Pedro' });
      expect(response.status).toBe(200);
      expect(response.body.data[0].nombre).toBe('Pedro');
    });
  });

  describe('POST /empleado', () => {
    it('debería crear un empleado', async () => {
      Empleado.create = jest.fn().mockResolvedValue({ id: 1, nombre: 'Ana', salario: 2000, fecha_ingreso: '2024-02-01' });
      const response = await request(app)
        .post('/empleado')
        .send({ nombre: 'Ana', salario: 2000, fecha_ingreso: '2024-02-01' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Empleado creado exitosamente');
    });
  });

  describe('DELETE /empleado/:id', () => {
    it('debería eliminar un empleado', async () => {
      Empleado.destroy = jest.fn().mockResolvedValue(1);
      const response = await request(app).delete('/empleado/1');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Empleado deleted successfully');
    });
  });
});
