import express from "express";
import { connectionStr } from "./dbConnection.js";
import mongoose from "mongoose";
import taskModel from "./model/tasks.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(connectionStr);

// Get all tasks
app.get("/", async (req, res) => {
  try {
    const result = await taskModel.find();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Add task
app.post("/add-task", async (req, res) => {
  try {
    const result = await taskModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete task
app.delete("/delete-task/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const result = await taskModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Task deleted", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get one task
app.get("/get-one/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const result = await taskModel.findById(id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update task
app.put("/update-one/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const result = await taskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3400, () => console.log("✅ Server running on port 3400"));
