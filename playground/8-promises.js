// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("failed");
//     resolve([1, 2, 3, 4, 5]);
//   }, 2000);
// });

// doWorkPromise
//   .then((result) => {
//     console.log("success:", result);
//   })
//   .catch((error) => {
//     console.log("error", error);
//   });

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// add(1, 2)
//   .then((sum) => {
//     console.log(sum);

//     add(sum, 5)
//       .then((sum2) => {
//         console.log(sum2);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

add(1, 1)
  .then((sum) => {
    console.log(sum);
    return add(sum, 3);
  })
  .then((sum2) => {
    console.log(sum2);
  });
