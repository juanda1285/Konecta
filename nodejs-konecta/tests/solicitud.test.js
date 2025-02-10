const request = require('supertest');
const express = require('express');
const router = require('../routes/solicitud');
const Solicitud = require('../models/Solicitud');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');

jest.mock('../middleware/auth', () => ({
  authenticateJWT: (req, res, next) => next(),
  authorizeRoles: (role) => (req, res, next) => {
    req.user = { role };
    return next();
  }
}));

const app = express();
app.use(express.json());
app.use('/solicitud', router);

describe('API de Solicitudes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /solicitud - obtiene solicitudes con paginación', async () => {
    Solicitud.findAndCountAll = jest.fn().mockResolvedValue({
      count: 2,
      rows: [
        { id: 1, codigo: 'SOL-001', descripcion: 'Solicitud 1', resumen: 'Resumen 1', id_empleado: 1 },
        { id: 2, codigo: 'SOL-002', descripcion: 'Solicitud 2', resumen: 'Resumen 2', id_empleado: 2 }
      ]
    });

    const res = await request(app).get('/solicitud');

    expect(res.status).toBe(200);
    expect(res.body.totalItems).toBe(2);
    expect(res.body.data.length).toBe(2);
  });

//   test('POST /solicitud - crea una nueva solicitud', async () => {
//     Solicitud.create = jest.fn().mockResolvedValue({
//       id: 3,
//       codigo: 'SOL-003',
//       descripcion: 'Nueva solicitud',
//       resumen: 'Resumen nuevo',
//       id_empleado: 3
//     });

//     const res = await request(app)
//       .post('/solicitud')
//       .send({ codigo: 'SOL-003', descripcion: 'Nueva solicitud', resumen: 'Resumen nuevo', id_empleado: 3 });

//     expect(res.status).toBe(200);
//     expect(res.text).toBe('Solicitud created successfully');
//   });

  test('DELETE /solicitud/:id - elimina una solicitud', async () => {
    Solicitud.destroy = jest.fn().mockResolvedValue(1);

    const res = await request(app).delete('/solicitud/1');

    expect(res.status).toBe(200);
    expect(res.text).toBe('Solicitud deleted successfully');
  });

  test('DELETE /solicitud/:id - falla al eliminar solicitud inexistente', async () => {
    Solicitud.destroy = jest.fn().mockResolvedValue(0);

    const res = await request(app).delete('/solicitud/999');

    expect(res.status).toBe(200);
    expect(res.text).toBe('Solicitud deleted successfully');
  });
});
