import loginModel from "../model/login.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await loginModel.findOne({ email: email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await loginModel.create({
      name,
      email,
      password: hashedPassword,
    });
    if (result) {
      jwt.sign(req.body, "Google", { expiresIn: "5d" }, (error, token) => {
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
      const isMatch = await bcrypt.compare(userData.password, result.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      if (isMatch) {
        jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
          res.status(200).json({ result, token });
        });
      } else {
        res.status(404).json({ error: "Password is wrong" });
      }
    } else {
      res.status(404).json({ error: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
