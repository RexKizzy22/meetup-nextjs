import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const client = await MongoClient.connect(
        "mongodb+srv://kizzy:Kizito%4094@cluster0.9tyrv.mongodb.net/meetupDB?retryWrites=true&w=majority"
      );
      const db = client.db();
      if (db) console.log("Connected");

      const meetUpCollection = db.collection("meetup");
      const result = await meetUpCollection.insertOne(req.body);

      console.log(result);
      client.close();

      res.status(200).json({ message: "New meet up inserted!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default handler;
