const express = require("express");
const router = express.Router();

// Import controller functions (you will create these next)
const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/<feature>Controller");

// Example routes
router.get("/", getAllItems);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
