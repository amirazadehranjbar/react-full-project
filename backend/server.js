require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// middleware
app.use(express.json());
app.use(cors());

// routers
app.use("/", userRouter);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`app listening on port ${PORT}`);
});
