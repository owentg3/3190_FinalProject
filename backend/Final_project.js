var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8080";
const host = "localhost";

const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";

const { MongoClient } = require("mongodb");
// const { albumsTemp } = require("../frontend/src/assets/albumstemp");
const client = new MongoClient(url);
const db = client.db(dbName);
const { ObjectId } = require("mongodb");




app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/home", async (req, res) => {

await client.connect();
console.log("Node connected successfully to GET MongoDB");
const query = {};

  const results = await db
    .collection("albums")
    .find(query)
    .limit(100)
    .toArray();

    console.log(results);
    res.status(200);
    res.send(results);

});

app.get("/mycollection", async (req, res) => {

  await client.connect();
  const db = client.db("secoms319");
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  
    const results = await db
      .collection("mycollection")
      .find(query)
      .limit(100)
      .toArray();
  
      console.log(results);
      res.status(200);
      res.send(results);
  
});

app.post("/credentials", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Received request for username:", username);

    const user = await db.collection('credentials').findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Server error:", err); 
    return res.status(500).json({ message: "Server error" });
  }
});
  
app.post("/addAlbum", async (req, res) => {
try {
    await client.connect();
    console.log("MongoDB connected");

    const newDocument = {
    name: req.body.name,
    artist: req.body.artist,
    rating: req.body.rating,
    image: req.body.image,
    link: req.body.link,
    genre: req.body.genre,
    };

    const result = await db.collection("albums").insertOne(newDocument);
    res.status(200);
    res.send(result);
} catch (error) {
    console.error("Could not add the new album" + error);
    res.status(500);
    res.send("Error adding new album");
} finally {
    await client.close();
}
});

app.post("/mycollection", async (req, res) => {
  try {
      await client.connect();
      const newDocument = {
      name: req.body.name,
      artist: req.body.artist,
      rating: req.body.rating,
      image: req.body.image,
      link: req.body.link,
      genre: req.body.genre,
      };
  
      const result = await db.collection("mycollection").insertOne(newDocument);
      res.status(200);
      res.send(result);
  } catch (error) {
      console.error("Could not add the album to your collection" + error);
      res.status(500);
      res.send("Error adding the album to your collection");
  } finally {
      await client.close();
  }
  });

app.post("/addCredentials", async (req, res) => {
try {
    await client.connect();
    const newDocument = {
    username: req.body.username,
    password: req.body.password,
    };

    const result = await db.collection("credentials").insertOne(newDocument);
    res.status(200);
    res.send(result);
} catch (error) {
    console.error("Could not add the new credentials" + error);
    res.status(500);
    res.send("Error adding new credentials");
} finally {
    await client.close();
}
});

app.delete("/mycollection/:id", async (req, res) => {
  try {
    await client.connect();
    const albumId = req.params.id;
    console.log("Album to delete:", albumId);

    const result = await db
      .collection("mycollection")
      .deleteOne({ _id: new ObjectId(albumId) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Album not found" });
    }

    res.status(200).send({ message: "Album deleted" });
  } catch (error) {
    console.error("Error deleting album:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/albums/:id", async (req, res) => {
  try {
    await client.connect();
    const albumId = req.params.id;

    const updateData = {
      $set: {
        name: req.body.name,
        artist: req.body.artist,
        rating: req.body.rating,
        image: req.body.image,
        link: req.body.link,
        genre: req.body.genre,
      }
    };

    const result = await db
      .collection("albums")
      .updateOne({ _id: new ObjectId(albumId) }, updateData);

    console.log("Matched:", result.matchedCount, "Modified:", result.modifiedCount);

    res.status(200).send(result);
  } catch (error) {
    console.error("Error updating album:", error);
    res.status(500).send({ message: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.delete("/albums/:id", async (req, res) => {
  try {
    await client.connect();
    const albumId = req.params.id;
    console.log("Album to delete:", albumId);

    const result = await db
      .collection("albums")
      .deleteOne({ _id: new ObjectId(albumId) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Album not found" });
    }

    res.status(200).send({ message: "Album deleted" });
  } catch (error) {
    console.error("Error deleting album:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});