const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { userOne, userTwo, taskOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: "from test1" })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("get tasks for user one", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("delete task from other user", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});

// Should not create task with invalid description/completed
test("create task with invalid description/completed", async () => {
  await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 555,
      completed: "completion",
    })
    .expect(400);
});

// Should not update task with invalid description/completed
test("update task with invalid description/completed", async () => {
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      completed: "stringcompletion",
    })
    .expect(400);
});

// Should delete user task
test("delete user task", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

// Should not delete task if unauthenticated
test("delete task unauthenticated", async () => {
  await request(app).delete(`/tasks/${taskOne._id}`).send().expect(401);
});

// Should not update other users task
test("update other user task", async () => {
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send({ completed: true })
    .expect(404);
});

// Should fetch user task by id
test("fetch user task by id", async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

// Should not fetch user task by id if unauthenticated
test("", async () => {
  await request(app).get(`/tasks/${taskOne._id}`).send().expect(401);
});

// Should not fetch other users task by id
test("fetch other users task by id", async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
});

// Should fetch only completed tasks
test("fetch completed tasks", async () => {
  const response = await request(app)
    .get("/tasks?completed=true")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  response.body.forEach((task) => {
    expect(task.completed).toEqual(true);
  });
});

// Should fetch only incomplete tasks
test("fetch incomplete tasks", async () => {
  const response = await request(app)
    .get("/tasks?completed=false")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  response.body.forEach((task) => {
    expect(task.completed).toEqual(false);
  });
});

// Should sort tasks by description/completed/createdAt/updatedAt
test("sort tasks by description desc", async () => {
  const response = await request(app)
    .get(`/tasks?sortBy=description:desc`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body[0].description).toBe("task2");
});

test("sort tasks by createdAt asc", async () => {
  const response = await request(app)
    .get(`/tasks?sortBy=createdAt:asc`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body[0].description).toBe("task1");
});

// Should fetch page of tasks
test("page of tasks", async () => {
  const response = await request(app)
    .get(`/tasks?limit=1`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toBe(1);
});
