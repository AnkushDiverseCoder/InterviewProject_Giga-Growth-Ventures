import express  from "express";
import { googleLogin, sendMail } from "../controller/auth.js";

const router = express.Router();

router.post('/auth/google',googleLogin);
router.post("/sendMail",sendMail);

export default router;