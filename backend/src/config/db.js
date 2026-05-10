import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

console.log("ENV TEST:");
console.log("DATABASE_URL =", process.env.DATABASE_URL ? "Loaded" : "Missing");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(() => console.log("✅ PostgreSQL Connected Successfully"))
  .catch((err) => console.log("❌ DB ERROR:", err));

export default pool;