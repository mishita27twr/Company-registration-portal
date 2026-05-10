import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
console.log("authRoutes loaded");

import companyRoutes from "./routes/companyRoutes.js";
console.log("companyRoutes loaded");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://company-registration-module-mauve.vercel.app"
  ],
  credentials: true
}));app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);

// Root route for deployment check
app.get("/", (req, res) => {
  res.send("Backend deployed successfully!");
});

console.log("Routes attached");

export default app;