const { MongoClient, ObjectID, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log(error);
    const db = client.db(databaseName);
    db.collection("users")
      .deleteMany({ age: 24 })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    db.collection("tasks")
      .deleteOne({
        description: "task1",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
