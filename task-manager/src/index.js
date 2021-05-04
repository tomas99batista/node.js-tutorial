const express = require("express");
require("./db/mongoose");
const auth = require("./middleware/auth");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   // const task = await Task.findById("60912cfc8aebc2eb881a597a");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("60912c56db4290d72e9c5cda");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
