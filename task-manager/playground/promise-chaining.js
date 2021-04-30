require("../src/db/mongoose");
const User = require("../src/models/user");

// 608948a38d5fbdaef1a32006

// User.findByIdAndUpdate("608945da3c779b91af53a2fd", { age: 1 })
//   .then((user) => {
//     console.log("user", user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log("\ncount user age=1:", result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (_id, _age) => {
  const user = await User.findByIdAndUpdate(_id, { age: _age });
  const count = await User.countDocuments({ age: _age });
  return count;
};

updateAgeAndCount("608945da3c779b91af53a2fd", 2)
  .then((count) => {
    console.log("count", count);
  })
  .catch((e) => {
    console.log(e);
  });
