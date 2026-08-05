const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser")

const app = express();

app.use(express.json());
app.user(cookieParser())


app.get("/", (req, res) => {
    res.send("API is working");
});
// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")
app.use("/api/v1", product);
app.use("/api/v1" , user);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;