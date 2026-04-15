const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// Load environment variables from .env
require("dotenv").config();

const User = require("./models/User");
const Entry = require("./models/Item");
const { requireAuth } = require("./middleware/auth");
const itemsRoutes = require("./routes/itemsRoutes");



const app = express();
app.use(express.json());
app.use("/Item", itemsRoutes);

const PORT = process.env.PORT || 3000;



// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Assignment 16 starter is running" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Helper function to keep responses consistent
function ok(res, message, data = null) {
  return res.status(200).json({ message, data });
}

// connect routes
app.use("/items", itemsRoutes);



// Protected "who am I" route
app.get("/profile", requireAuth, (req, res) => {
  return ok(res, "You are authenticated", { userId: req.userId, email: req.email });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const logger = require("./middleware/logger");
app.use(logger);

/*
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const User = require("./models/User");
const Item = require("./models/Item");
const itemsRoutes = require("./routes/itemsRoutes");


app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Replace this with your MongoDB Atlas connection string
//const MONGO_URI = "mongodb+srv://shantipalmer_db_user:3D2YMDL@cluster01-test.vtfqgxk.mongodb.net/?appName=cluster01-tests";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// base route
app.get("/", (req, res) => {
  res.json({ message: "cst218-lab9 api running", data: null });
});

// connect routes
app.use("/items", itemsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//registers
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // bcrypt.hash(password, saltRounds)
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({email, passwordHash,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: { email: newUser.email },
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // bcrypt.compare(plainPassword, hash)
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});
*/

