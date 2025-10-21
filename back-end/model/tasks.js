import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: String,
  desc: String,
  priority: String,
  completed: Boolean,
  image: String
});

const taskModel = mongoose.model("tasks", taskSchema);

export default taskModel;
