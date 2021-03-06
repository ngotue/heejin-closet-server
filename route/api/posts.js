const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });

  res.status(201).send();
});

router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });

  res.status(200).send();
});

async function loadPostsCollection() {
  console.log("env : ",process.env.NODE_ENV);
  const clientDev = await mongodb.MongoClient.connect(
    "mongodb://localhost:27017",
    {
      useNewUrlParser: true
    }
  );
  const uri = "mongodb://heejin-admin:kobiet26501234@heejin-closet-1-bjxbc.mongodb.net/test?retryWrites=true&w=majority";
  const clientProd = await mongodb.MongoClient.connect(uri, { useNewUrlParser: true });
  
  return process.env.NODE_ENV === "development" ? clientDev.db("heejin_closet").collection("posts") : clientProd.db("test").collection("devices");
}

module.exports = router;
