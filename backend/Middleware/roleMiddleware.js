const roleMiddleware = (req, res, next) => { //To check if role =="recuriter"
  const role = req.user.role;

    console.log("ROLE:", role);

  if (role === "recruiter") {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied",
    });
  }
};

module.exports = roleMiddleware
