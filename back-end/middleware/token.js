import jwt from "jsonwebtoken";

export const verifyJwtToken = (req, res, next) => {
//   console.log(req.cookies["token"]);
  const token = req.cookies["token"];
  jwt.verify(token, "Google", (error, decoded) => {
    if (error) {
      return res.send({ msg: "Invalid token", success: false });
    }
    console.log(decoded);
    next();
  });
};
