const access = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.role)) {
      console.log(req.role);
      next();
    } else {
      res.status(401).send({ msg: "Unathorized" });
    }
  };
};

module.exports = {
  access,
};
