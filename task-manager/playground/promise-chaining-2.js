require("../src/db/mongoose");
const Task = require("../src/models/task");

// new Task({ description: "task1" }).save();
// new Task({ description: "task2" }).save();
// new Task({ description: "task3" }).save();
// 608949334629bcb465a72977

// Task.findByIdAndRemove("608948a38d5fbdaef1a32006")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((count) => {
//     console.log("count of not completed tasks:", count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (_id) => {
  const task = await Task.findByIdAndRemove(_id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("608bc9a29160e10abcec9636")
  .then((count) => {
    console.log("count", count);
  })
  .catch((e) => {
    console.log(e);
  });
