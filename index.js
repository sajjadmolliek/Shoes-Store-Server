const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5005;

// middleWare
app.use(cors());
app.use(express.json());

// MongoDB COde:

const uri = `mongodb+srv://${process.env.DB_U_NAME}:${process.env.DB_PASS}@cluster0.rsgizg7.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const AddProductCollection = client.db("AddProductDB").collection("Products");

    // --------------------------------AddProductCollection Data Collection Server--------------------------------------

    // Insert Into Database:
    app.post("/addProduct", async (req, res) => {
      const addingProducts = req.body;
      console.log(addingProducts);
      const result = await AddProductCollection.insertOne(addingProducts);
      res.send(result);
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello I am REST API");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
