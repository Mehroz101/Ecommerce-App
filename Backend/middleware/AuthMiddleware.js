const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization.split(" ")[1])
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
