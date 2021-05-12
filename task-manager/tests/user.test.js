const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("signup new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "tomas",
      email: "tomas@example.com",
      password: "1234567",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "tomas",
      email: "tomas@example.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("1234567");
});

test("login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);

  expect(response.body.token).toBe(user.tokens[1].token);
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

test("get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("get profile for user unauthenticated", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("delete account for user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("delete account for user unauthorized", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("upload avatar img", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  const user = await User.findById(userOneId);

  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "pedro",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("pedro");
});

test("not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "aveiro" })
    .expect(400);
});

// Should not signup user with invalid name/email/password
test("signup with invalid name/email/password", async () => {
  await request(app)
    .post("/users")
    .send({
      name: 4,
      email: "invalidemail",
      password: 1234,
    })
    .expect(400);
  const user = await User.findOne({ email: "invalidemail" });
  expect(user).toBeNull();
});

// Should not update user if unauthenticated
test("update user unauth", async () => {
  await request(app)
    .patch("/users/me")
    .send({
      name: "changed name",
    })
    .expect(401);
});

// Should not update user with invalid name/email/password
test("update user invalid name/email/password", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 2,
      email: "invalidemail",
      password: 123,
    })
    .expect(400);
});

// Should not delete user if unauthenticated
test("delete user unauthenticated", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
