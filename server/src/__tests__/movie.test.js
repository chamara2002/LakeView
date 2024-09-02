const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app.js"); // Adjust the path if needed
const Movie = require("../models/movie.model.js");


// Cleanup function
afterEach(async () => {
  await Game.deleteMany();
  await Customer.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});


describe("Movie Routes", () => {
  it("should add a new movie", async () => {
    const res = await request(app)
      .post("/movies/movies")
      .send({
        name: "Inception",
        category: "Sci-Fi",
        availableTimes: [new Date()],
        duration: 120,
        price: 12,
        description: "A movie about dreams"
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Inception");
  });

  it("should return a list of movies", async () => {
    const movie = new Movie({
      name: "Inception",
      category: "Sci-Fi",
      availableTimes: [new Date()],
      duration: 120,
      price: 12,
      description: "A movie about dreams"
    });
    await movie.save();

    const res = await request(app)
      .get("/movies/movies");

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a movie", async () => {
    const movie = new Movie({
      name: "Inception",
      category: "Sci-Fi",
      availableTimes: [new Date()],
      duration: 120,
      price: 12,
      description: "A movie about dreams"
    });
    await movie.save();

    const res = await request(app)
      .put(`/movies/movies/${movie._id}`)
      .send({ name: "Inception Updated" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Inception Updated");
  });
});
