import { envs } from "../config/enviroments/enviroments.js";
import { AppError, catchAsync } from "../errors/index.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { AuthService } from "./auth.services.js";

const authService = new AuthService();

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  const user = await authService.findOneUserById(decoded.id);

  if (!user) {
    return next(
      new AppError("The owner of this token is not longer available", 401)
    );
  }

  if (user.changedPasswordAt) {
    const changedTimeStamp = parseInt(
      user.changedPasswordAt.getTime() / 1000,
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError("User recently changed password, please login again!"),
        401
      );
    }
  }

  req.sessionUser = user;

  next();
});

export const restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

export const protectAccountOwner = (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401))
  }
    next()
  }

export const validateExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await authService.findOneUserById(id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  req.user = user;

  next();
});
