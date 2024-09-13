const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    if (verified) {
      // console.log("verified user", verified);
      req.user = verified;
      next();
    }
  } catch (error) {
    return res.status(401).send("Unauthorized Access!");
  }
};

module.exports = authMiddleware;
