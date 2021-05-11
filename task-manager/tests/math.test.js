const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

test("calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("calculate total with default tipPercentage", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("32F to 0C", () => {
  expect(fahrenheitToCelsius(32)).toBe(0);
});

test("0C to 32F", () => {
  expect(celsiusToFahrenheit(0)).toBe(32);
});

// test("async test demo", (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 2000);
// });

test("add 2 numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("add 2 numbers async await", async () => {
  const total = await add(2, 3);
  expect(total).toBe(5);
});
