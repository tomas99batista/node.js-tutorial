require("../src/db/mongoose");
const Task = require("../src/models/task");

// 608949334629bcb465a72977

Task.findByIdAndRemove("608948a38d5fbdaef1a32006")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((count) => {
    console.log("count of not completed tasks:", count);
  })
  .catch((e) => {
    console.log(e);
  });
