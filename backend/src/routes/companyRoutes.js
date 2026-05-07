import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { saveCompanyProfile, getCompanyProfile } from "../controllers/companyController.js";

const router = express.Router();

router.post("/profile", verifyToken, saveCompanyProfile);
router.get("/profile", verifyToken, getCompanyProfile);

export default router;