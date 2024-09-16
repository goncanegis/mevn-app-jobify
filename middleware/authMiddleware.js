import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    req.token = token; // Store the token in the request object for later use
  } else {
    req.token = null;
  }

  if (!req.token) throw new UnauthenticatedError("Authentication required");

  try {
    const { userId, role } = verifyJWT(req.token);

    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication required");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Not authorized to access this route");
    }

    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User. Read Only!");
  next();
};
