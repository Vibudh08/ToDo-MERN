import mongoose from "mongoose";

const loginSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const loginModel = mongoose.model("logins", loginSchema);

export default loginModel;
