import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: String,
  description: String,
});

const taskModel = mongoose.model("tasks", taskSchema);

export default taskModel;
