import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * get 50 first posts
 */
router.get("/", async (req, res) => {
  let collection = await db.collection("posts");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});


/**
 * get latest post
 */
router.get("/latest", async (req, res) => {
  let collection = await db.collection("posts");
  let results = await collection.aggregate([
    {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
    {"$sort": {"date": -1}},
    {"$limit": 3}
  ]).toArray();
  res.send(results).status(200);
});


/**
 * get Post By Id
 */
router.get("/:id", async (req, res) => {
  let collection = await db.collection("posts");
  let query = {_id: ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


/**
 * create new post
 */
router.post("/", async (req, res) => {
  let collection = await db.collection("posts");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


/**
 * update post by Id
 */
router.patch("/comment/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $push: { comments: req.body }
  };

  let collection = await db.collection("posts");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

/**
 * delete a chosen post
 */
router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("posts");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
