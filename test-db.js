import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Read .env

const db = new pg.Client({ connectionString: process.env.DATABASE_URL });

try {
  await db.connect();
  console.log("✅ Connected successfully");
  await db.end();
} catch (err) {
  console.error("❌ Connection failed:", err.message);
}
