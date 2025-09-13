const adminGuard = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.isAdmin) {
      res.status(401).send({ error: "Permission denied" });
      return;
    }
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
    console.log(error);
  }
};

module.exports = { adminGuard };
