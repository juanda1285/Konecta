const request = require('supertest');
const app = require('../index'); // Asegúrate de la ruta correcta
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models/User');

describe('Auth Routes', () => {
  it('should return a token on successful login', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: await bcrypt.hash('password', 10),
      role: 'admin'
    };
    User.findOne.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'password'
      });

    expect(response.statusCode).toBe(200);
    expect(response.headers).toHaveProperty('authorization');
    const token = response.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty('id', mockUser.id);
    expect(decoded).toHaveProperty('role', mockUser.role);
  });

  it('should return 400 for invalid username', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'invaliduser',
        password: 'password'
      });

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Username or Password is wrong');
  });

  it('should return 400 for invalid password', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: await bcrypt.hash('password', 10),
      role: 'admin'
    };
    User.findOne.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Invalid password');
  });
});

describe('POST /register', () => {
  // it('should register a user successfully', async () => {
  //   const newUser = {
  //     username: 'newuser10',
  //     password: 'password123',
  //     role: 'admin2'
  //   };

  //   User.prototype.save = jest.fn().mockResolvedValue(); // Mockear la función save

  //   const response = await request(app)
  //     .post('/auth/register')
  //     .send(newUser);
  //     console.log(response.text,'respuesta')

  //   // expect(User).toHaveBeenCalledWith(expect.objectContaining({
  //   //   username: newUser.username,
  //   //   role: newUser.role
  //   // })); // Verificar que el usuario se creó con los datos correctos
  //   expect(User.prototype.save).toHaveBeenCalled(); // Asegurarse de que save fue llamado
  //   expect(response.statusCode).toBe(200);
  // });

  it('should return 400 if username is missing', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        password: 'password123',
        role: 'user'
      });

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Username is required');
  });

  it('should return 400 if password is missing', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        username: 'newuser',
        role: 'user'
      });

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Password is required');
  });
  
  it('should return 400 if user already exists', async () => {
    const newUser = {
      username: 'existinguser',
      password: 'password123',
      role: 'user'
    };

    User.findOne.mockResolvedValue(newUser); // Simular que el usuario ya existe

    const response = await request(app)
      .post('/auth/register')
      .send(newUser);

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('User already exists');
  });
});
