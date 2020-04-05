const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("user with invalid input is not created", () => {
  test("cannot create user with name length < 3 chars", async () => {
    const testUser = {
      username: "lo",
      password: "123456",
    };
    const addUserResponse = await api
      .post("/api/users")
      .send(testUser)
      .expect(400);
  });

  test("cannot create user with password length < 3 chars", async () => {
    const testUser = {
      username: "lolka",
      password: "12",
    };
    const addUserResponse = await api
      .post("/api/users")
      .send(testUser)
      .expect(400);
    expect(addUserResponse.body.error).toBe(
      "password should have 3 or more characters"
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
