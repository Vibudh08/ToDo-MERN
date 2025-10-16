import loginModel from "../model/login.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const userData = req.body;
    const result = await loginModel.create(userData);
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        console.log(token);
        res.status(200).json({ result, token });
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const userData = req.body;

  if (!userData) {
    return res.status(400).json({ error: "No data" });
  }
  try {
    const result = await loginModel.findOne({ email: userData.email });
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        console.log(token);
        res.status(200).json({ result, token });
      });
    } else {
      res.status(404).json({ error: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
