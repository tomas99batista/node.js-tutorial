require("../src/db/mongoose");
const User = require("../src/models/user");

// 608948a38d5fbdaef1a32006

User.findByIdAndUpdate("608945da3c779b91af53a2fd", { age: 1 })
  .then((user) => {
    console.log("user", user);
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log("\ncount user age=1:", result);
  })
  .catch((e) => {
    console.log(e);
  });
