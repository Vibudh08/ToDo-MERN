import mongoose from "mongoose";
import taskModel from "../model/tasks.js";
import fs from "fs";
import path from "path";

export const getTask = async (req, res) => {
  try {
    const result = await taskModel.find();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const postTask = async (req, res) => {
  try {
    const { title, desc, priority, completed } = req.body;
    const image = req.file.filename;

    const task = await taskModel.create({
      title,
      desc,
      priority,
      completed,
      image,
    });
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSingle = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.findById(id);
    if (task.image) {
      const imagePath = path.join("uploads", task.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

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
};

export const deleteMultiple = async (req, res) => {
  const ids = req.body;
  const deleteTasId = ids && ids.map((item) => item);
  console.log(deleteTasId);
  try {
    const result = await taskModel.deleteMany({ _id: { $in: deleteTasId } });
    res.status(200).json({ success: true, message: "Task deleted", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getOne = async (req, res) => {
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
};

export const updateTask = async (req, res) => {
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
};
