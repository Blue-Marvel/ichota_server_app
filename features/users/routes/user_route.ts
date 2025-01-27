import express from "express";
import { authUser, getAllUsers, login } from "../controllers/user_controller";

const router = express.Router();

router.post("/", authUser);
router.post("/login", login);
router.get("/", getAllUsers);

export default router;
