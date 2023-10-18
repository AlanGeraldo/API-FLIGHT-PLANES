import express from "express";
import { login, register, changePassword, deleteAccount } from "./auth.controller.js";
import { protect, protectAccountOwner, restricTo, validateExistUser } from "./auth.middleware.js";

export const router = express.Router();

router.post('/login', login)

router.post('/register',register)

router.patch('/change-password', protect ,changePassword)

router.delete('/:id', protect ,validateExistUser, protectAccountOwner ,deleteAccount)