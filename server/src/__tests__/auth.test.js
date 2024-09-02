const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');  // Adjust the path to your main app file
const Customer = require('../models/customer.model.js');

// Cleanup function to run after each test
afterEach(async () => {
  await Customer.deleteMany();
});

// Close mongoose connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  it('should signup a new customer', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should login an existing customer', async () => {
    // First, signup a customer
    const customer = new Customer({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await argon2.hash('password123')
    });
    await customer.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return the customer profile', async () => {
    const customer = new Customer({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await argon2.hash('password123')
    });
    await customer.save();

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password123'
      });

    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/auth/profile')
      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'johndoe@example.com');
  });
});
