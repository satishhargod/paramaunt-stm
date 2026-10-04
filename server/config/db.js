import mysql from "mysql2/promise";

let pool;

export const getDB = async () => {
  if (!pool) {
    try {
      console.log("🔥 Connecting DB...");
      console.log("ENV:", process.env.DB_HOST); // ✅ now this will print

      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      console.log("✅ DB Connected");
    } catch (error) {
      console.error("❌ DB Connection Failed:", error.message);
      throw error;
    }
  }

  return pool;
};