const {Pool}=require("pg");

// PostgreSQL Connection Pool

const pool = new Pool({
    user: "postgres", // Change this
    host: "localhost",
    password: "123456789", // Change this
    database: "book_cataloge", // Change this
    port: 5432, // Default PostgreSQL port
  });

  
  pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error", err));

module.exports = pool; // Export the pool for use in other files