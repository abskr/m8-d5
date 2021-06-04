import MongoClient from "mongodb";

async function mongoDB() {
  const client = new MongoClient(
    process.env.MONGO_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (!err) {
        console.log("We are connected");
      }
    }
  );

  try {
    await client.connect();
    await listDatabases(client);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
mongoDB().catch(console.error);

export default mongoDB;
