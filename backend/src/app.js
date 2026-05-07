import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
console.log("authRoutes loaded");

import companyRoutes from "./routes/companyRoutes.js";
console.log("companyRoutes loaded");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);

console.log("Routes attached");

export default app;