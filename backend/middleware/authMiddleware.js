// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

// ─────────────────────────────────────────────────────────────────────────────
//  default export: simple middleware to verify token and attach user info
// ─────────────────────────────────────────────────────────────────────────────
export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    // decoded might include { id, role, iat, exp }
    req.userId   = decoded.id || decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    console.error("authMiddleware:", err);
    return res.status(401).json({ error: "Unauthorized, invalid token" });
  }
}


// ─────────────────────────────────────────────────────────────────────────────
//  protect(): same as default, but stores everything under req.user
//  authorize(...roles): gateway that only allows certain roles
// ─────────────────────────────────────────────────────────────────────────────
export const protect = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    // keep the entire payload on req.user
    req.user = {
      userId: decoded.id || decoded.userId,
      role:   decoded.role,
    };
    next();
  } catch (err) {
    console.error("protect:", err);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: insufficient permissions" });
  }
  next();
};
