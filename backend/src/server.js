// backend/src/server.js
require("dotenv").config();
require("./config/passport")
const express = require("express");
const mongoose = require("mongoose");
const authUserRouter = require("./routes/authUserRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const inventoryRouter = require("./routes/inventoryRouter");
// imports for passport requires
const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3000;

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// middleware - ORDER MATTERS!
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3500', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ ADD SESSION MIDDLEWARE (before passport)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// ✅ ADD PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use("/", authUserRouter);
app.use("/", categoryRouter);
app.use("/", productRouter);
app.use("/", inventoryRouter);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});