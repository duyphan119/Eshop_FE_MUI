import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const reqHeader = req.headers["authorization"];
  if (reqHeader) {
    const token = reqHeader.split(" ")[1];
    if (token) {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(401).json("Token's expired");
      }
    }
  } else {
    return res.status(401).json("Not authorization");
  }
};
module.exports = {verifyToken}