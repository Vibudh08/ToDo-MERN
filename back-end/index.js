import express from "express";
import {
  deleteMultiple,
  deleteSingle,
  getOne,
  getTask,
  postTask,
  updateTask,
} from "./controller/taskController.js";
import cors from "cors";
import { connectionStr } from "./dbConnection.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { login, signup } from "./controller/loginController.js";
import { verifyJwtToken } from "./middleware/token.js";
mongoose.connect(connectionStr);

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Get all tasks
app.get("/", verifyJwtToken, getTask);

// Add task
app.post("/add-task", postTask);

// Delete task
app.delete("/delete-task/:id", deleteSingle);

// Delete task
app.delete("/delete-multiple-task", deleteMultiple);

// Get one task
app.get("/get-one/:id", getOne);

// Update task
app.put("/update-one/:id", updateTask);

app.post("/signup", signup);

app.post("/login", login);

app.listen(3400, () => console.log("✅ Server running on port 3400"));
