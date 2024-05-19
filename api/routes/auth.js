import express from "express";
import { register } from "../controllers/authc.js";
import { login } from "../controllers/authc.js";

const router = express.Router();

router.post("/register" , register);
router.post("/login" , login);

export default router