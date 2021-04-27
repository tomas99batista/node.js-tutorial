const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("failed");
    resolve([1, 2, 3, 4, 5]);
  }, 2000);
});

doWorkPromise
  .then((result) => {
    console.log("success:", result);
  })
  .catch((error) => {
    console.log("error", error);
  });
