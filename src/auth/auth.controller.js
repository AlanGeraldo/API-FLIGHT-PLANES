import { verifyPassword } from "../config/plugins/encripted-password.plugin.js";
import generateJWT from "../config/plugins/generate-JWT.plugin.js";
import { AppError, catchAsync } from "../errors/index.js";
import { validateLogin, validateRegister } from "./auth.schema.js";
import { AuthService } from "./auth.services.js";

// {
//     "tabWidth": 2,
//     "arrowParens": "always",
//     "printWidth": 80,
//     "singleQuote": true
// .prettierrc
//   }

const authService = new AuthService();

export const login = catchAsync(async (req, res, next) => {
  const { errorMessage, hasError, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const user = await authService.findOneUserByEmail(userData.email);

  if (!user) {
    return next(new AppError("This accound does not exist", 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      gender: user.gender,
    },
  });
});

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const user = await authService.createUser(userData);

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      gender: user.gender,
    },
  });
});
