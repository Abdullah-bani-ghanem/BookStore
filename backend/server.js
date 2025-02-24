const express =require('express');
const pool=require("./db")
const cors = require("cors");




const app =express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies



const port =4055;
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})


///////////////////////get//////////////////
app.get("/getAllBooks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM book WHERE is_deleted = FALSE");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


////////////////post//////////////////////
app.post("/newBook", async (req, res) => {
  try {
    console.log('req.body', req.body);
    
    const { title, author, genre, date, description } = req.body;
    const result = await pool.query(
      "INSERT INTO book (title, author,genre,date,description ) VALUES ($1, $2, $3,$4,$5) RETURNING *",
      [title, author,genre,date,description]
    );
    res.json(result.rows[0]);
    console.log(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//////////////update/////////////////////
app.put("/updateBook/:id", async (req, res) => {
  try {
    console.log("req.body", req.params.id);

    const { id } = req.params; // Get book ID from URL params
    const { title, author, genre, date, description } = req.body;

    const result = await pool.query(
      "UPDATE book SET title = $1, author = $2, genre = $3, date = $4, description = $5 WHERE id = $6 RETURNING *",
      [title, author, genre, date, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.rows[0]); // Send updated book details
    console.log("Updated Book:", result.rows[0]);
  } catch (err) { 
    res.status(500).json({ error: err.message });
  }
});



////////////////////delete///////////////////
app.put("/softDeleteBook/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE book SET is_deleted = TRUE WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book marked as deleted", book: result.rows[0] });
    console.log("Soft Deleted Book:", result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});














// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const pool = require("./db");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // اختبار الاتصال بقاعدة البيانات
// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Database connection error:", err);
//   } else {
//     console.log("Database connected successfully:", res.rows[0]);
//   }
// });

// app.get("/book", (req, res) => {
//   res.send("Book Catalog API is running...");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
























// // const express = require("express");
// // const cors = require("cors");
// // const bodyParser = require("body-parser");
// // require("dotenv").config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // app.use(cors());
// // app.use(bodyParser.json());

// // app.get("/", (req, res) => {
// //     res.send("Book Catalog API is running...");
// // });

// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });
