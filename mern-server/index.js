const express = require('express')
const app = express()
const port = process.env.port || 5000
const cors = require('cors');


// middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// mongo db configuration 


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-project:BGTc71AWUT1w1Clr@cluster0.tfhxnkg.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create a collection of the documents
    const bookCollections = client.db("BookInventory").collection("books");

    //insert a book to the database using post method  
    app.post("/upload-book", async (req, res) => {
      const data = req.body; // Use req.body instead of req.body()
      const result = await bookCollections.insertOne(data);
      res.send(result);
    })
    
    // get all books from the database
    app.get("/all-books", async (req, res) => {
      try {
        const data = await bookCollections.find().toArray(); // Corrected to await the find() method and toArray() method
        res.send(data);
      } catch (error) {
        console.error("Error fetching all books:", error);
        res.status(500).send("Error fetching all books");
      }
    });

// update a book data : patch or update method 
app.patch("/book/:id", async (req, res) => { // Define `id` as a route parameter
  const id = req.params.id;
  const updateBookData = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };

  const updateDoc = {
    $set: {
      ...updateBookData
    }
  };

  try {
    // Update
    const result = await bookCollections.updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Error updating book");
  }
});


// delete a book 
app.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };

  try {
    const result = await bookCollections.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.send("Book deleted successfully");
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Error deleting book");
  }
});

// find by catergories 
app.get("/all-books", async (req, res) =>{
  let query = {};
  if(req.query?.category){
    query = {category: req.query.category}
  }
  const result = await bookCollections.find(query).toArray();
  res.send(result);
})

// single book data 
app.get("/book/:id", async (req, res,)=>{
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) }; 
  const result = await bookCollections.findOne(filter);
  res.send(result); 
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})