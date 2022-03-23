import jwt from "jsonwebtoken";
const getUser = (req, res, next) => {
  const reqHeader = req.headers["authorization"];
  console.log(req.headers)
  if (reqHeader) {
    const token = reqHeader.split(" ")[1];
    if (token) {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (user) {
        req.user = user;
      }
    }
  }
  next();
};
const verifyToken = (req, res, next) => {
  getUser(req, res, () => {
    if (req.user) {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};

const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params.userId === req.user.id) {
      next();
    }else{
      return res.status(401).json("Not authorization");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params.userId === req.user.id && req.user.isAdmin) {
      next();
    }else{
      return res.status(401).json("Not authorization");
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};
module.exports = {
  getUser,
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndAdmin,
  verifyAdmin,
};
