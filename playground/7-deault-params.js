const greeter = (name = "user", age = 8) => {
  console.log(`hello ${name} with ${age} years old`);
};

greeter("Andrew");

greeter();
