const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "tomas",
  email: "tomasteste@teste.com",
  password: "1234567",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("signup new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "tomas",
      email: "tomas@example.com",
      password: "1234567",
    })
    .expect(201);
});

test("login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("login failure - non existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "wrongemail@email.com",
      password: "failure1234",
    })
    .expect(400);
});
