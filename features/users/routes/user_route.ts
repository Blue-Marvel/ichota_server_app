import express from "express";
import { authUser, getAllUsers, login } from "../controllers/user_controller";

const router = express.Router();

router.post("/auth", authUser);

export default router;
