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
      const result = await AddProductCollection.insertOne(addingProducts);
      res.send(result);
    });
    // Read From Database:
    app.get("/addProduct", async (req, res) => {
      const cursor = AddProductCollection.find();
      const result = await cursor.toArray();

      res.send(result);
    });

    // POST and Read From Database:
    app.post("/addProducts", async (req, res) => {
      try {
        const products = req.body; // This contains the brand_name sent from the frontend
    
        // Use the brand_name to query your MongoDB collection
        const query = { brand_name: products.brand_name};
        const cursor = AddProductCollection.find(query);
        const result = await cursor.toArray();
    
        if (result.length > 0) {
          // Products matching the brand_name were found
          res.send(result);
        } else {
          // No products found for the specified brand_name
          res.send([]);
        }
      } catch (error) {
        console.error("Error querying the database:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    
    // Delete Data From Database
    app.delete("/addProducting/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await AddProductCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
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
