const roleMiddleware =  (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
  }

  next()
}

module.exports = roleMiddleware;