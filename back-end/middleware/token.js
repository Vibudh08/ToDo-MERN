import jwt from "jsonwebtoken";

export const verifyJwtToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) {
    return res.status(401).json({ msg: "No token provided", success: false });
  }

  jwt.verify(token, "Google", (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ msg: "Invalid or expired token", success: false });
    }
    req.user = decoded;
    next();
  });
};
