const { User } = require("../schema/user.schema");
const jwt = require("jsonwebtoken");

const authGuard = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(400).send({ error: "Invalid Token" });
    }
    const decodedToken = jwt.verify(authorization, process.env.JWT_SECRET_KEY);

    const loggedInUser = await User.findById(decodedToken.id).select(
      "-password"
    );

    if (!loggedInUser) {
      res.status(403).send({ error: "Invalid User" });
      return;
    }

    req.user = loggedInUser;
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
    console.log(error);
  }
};

module.exports = { authGuard };
