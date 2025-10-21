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
import multer from "multer";
import path from "path";

mongoose.connect(connectionStr);

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, PNG files are allowed"));
    }
  },
});

// Get all tasks
app.get("/", verifyJwtToken, getTask);

// Add task
app.post("/add-task", verifyJwtToken, upload.single("image"), postTask);

// Delete task
app.delete("/delete-task/:id", verifyJwtToken, deleteSingle);

// Delete task
app.delete("/delete-multiple-task", verifyJwtToken, deleteMultiple);

// Get one task
app.get("/get-one/:id", verifyJwtToken, getOne);

// Update task
app.put("/update-one/:id", verifyJwtToken, updateTask);

// Signup
app.post("/signup", signup);

// Login
app.post("/login", login);

app.listen(3400, () => console.log("✅ Server running on port 3400"));
