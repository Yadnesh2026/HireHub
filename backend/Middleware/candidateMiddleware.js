const candidateMiddlware = (req, res, next) => {
  const role = req.user.role;

  if (role == "candidate") {
    next();
  } else {
    return res.status(403).json({
      message: "You are not candidate",
    });
  }
};

module.exports = candidateMiddlware;
