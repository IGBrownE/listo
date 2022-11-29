const config = require('config');
const connectDB = require("./config/db");

const express = require("express");
const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running.."));

//Definr routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = config.get("PORT");
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

