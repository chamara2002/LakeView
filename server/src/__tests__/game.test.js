const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Game = require('../models/games.model.js');
const Customer = require('../models/customer.model.js');

// Cleanup function
afterEach(async () => {
  await Game.deleteMany();
  await Customer.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Game Routes', () => {
  it('should add a new game', async () => {
    const res = await request(app)
      .post('/api/games')
      .send({
        name: 'Chess',
        category: 'Board',
        availableTimes: [new Date()]
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Chess');
  });

  it('should return a list of games', async () => {
    const game = new Game({
      name: 'Chess',
      category: 'Board',
      availableTimes: [new Date()]
    });
    await game.save();

    const res = await request(app)
      .get('/api/games');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a game', async () => {
    const game = new Game({
      name: 'Chess',
      category: 'Board',
      availableTimes: [new Date()]
    });
    await game.save();

    const res = await request(app)
      .put(`/api/games/${game._id}`)
      .send({ name: 'Chess Updated' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Chess Updated');
  });

  it('should delete a game', async () => {
    const game = new Game({
      name: 'Chess',
      category: 'Board',
      availableTimes: [new Date()]
    });
    await game.save();

    const res = await request(app)
      .delete(`/api/games/${game._id}`);

    expect(res.statusCode).toEqual(204);
  });
});
