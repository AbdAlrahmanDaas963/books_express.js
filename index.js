const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

// routes
const bookRouter = require("./routes/books");

const port = 3000; // You can choose any available port

app.use(cors());
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ?
app.use("/api/books", bookRouter);
// ?

// const corsOptions = {
//   origin: "http://localhost:3001", // Replace with the origin of your frontend
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Include cookies in CORS requests if needed
//   optionsSuccessStatus: 204, // Return a 204 status for preflight requests
// };
// app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
