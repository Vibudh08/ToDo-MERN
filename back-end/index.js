import express from "express";
import { connectionStr } from "./dbConnection.js";
import mongoose from "mongoose";
import taskModel from "./model/tasks.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(connectionStr);

app.get("/", async (req, res) => {
  try {
    const result = await taskModel.find();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message });
  }
});

app.post("/add-task", async (req, res) => {
  try {
    const result = await taskModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/delete-task/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await taskModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3400);
