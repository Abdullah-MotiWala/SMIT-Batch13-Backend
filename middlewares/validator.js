const validator = (schema) => {
  return (req, res, next) => {
    const response = schema.validate(req.body);
    if (response.error) {
      res.status(422).json({ error: response.error.details[0].message });
    }
    next();
  };
};

module.exports = { validator };

module.exports = { validator };
