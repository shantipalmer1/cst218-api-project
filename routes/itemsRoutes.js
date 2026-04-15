const express = require("express");
const router = express.Router();

const validateItem = require("../middleware/validateItem");
const validateObjectId = require("../middleware/validateObjectId");

// Import controller functions (you will create these next)
const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/itemsController");

// Example routes
router.get("/", validateItem, validateObjectId, getAllItems);
router.post("/", validateItem, validateObjectId, createItem);
router.put("/:id", validateItem,validateObjectId, updateItem);
router.delete("/:id", validateItem, validateObjectId, deleteItem);

module.exports = router;



/*

const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/Item");
const { requireAuth } = require("../middleware/auth")

const router = express.Router();

/**
 * Consistent JSON helpers (use these for ALL routes)
 * Success: { message: "...", data: ... }
 * Error:   { error: "...", details: ... }
 

function sendSuccess(res, message, data, status = 200) {
  return res.status(status).json({ message, data });
}

function sendError(res, error, details, status = 400) {
  return res.status(status).json({ error, details });
}

/**
 * POST /items
 * Creates a new item in MongoDB

router.post("/",requireAuth, async (req, res) => {
  try {
    const { item, cost, store, category } = req.body;

    // 400 if required fields are missing
    if (!item || item.trim().length === 0) {
      return sendError(
        res,
        "Missing required field",
        "item name is required (example: { \"item\": \"Sample Item\" })",
        400
      );
    }

    if (!cost || cost.trim() === "") {
  return res.status(400).json({ error: "cost of item is required" });
}

if (!store || store.trim() === "") {
  return res.status(400).json({ error: "store item was bought from is required" });
}

if (!category || category.trim() === "") {
  return res.status(400).json({ error: "category of item is required" });
}


     

    const newItem = await Item.create({
      userId: req.userId,
      item: item.trim(),
      cost: cost || "$",
      store: store || "",
      category: category || "general"
    });

   return sendSuccess(res, "Item created successfully", newItem, 201);
  } catch (err) 
  {
    return sendError(res, "Create failed", err.message, 400);
  }
});






/**
 * GET /items
 * Returns all items from MongoDB
 
router.get("/", requireAuth, async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    return sendSuccess(res, "Items retrieved successfully", items, 200);
  } catch (err) {
    return sendError(res, "Fetch failed", err.message, 500);
  }
});

/**
 * GET /items/:id
 * Returns one item by MongoDB _id
 
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // 400 if id format is invalid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, "Invalid ID format", `The id "${id}" is not a valid MongoDB ObjectId`, 400);
    }

    const item = await Item.findById(id);

    // 404 if item not found
    if (!item) {
      return sendError(res, "Item not found", `No item exists with id "${id}"`, 404);
    }

    return sendSuccess(res, "Item retrieved successfully", item, 200);
  } catch (err) {
    return sendError(res, "Fetch failed", err.message, 500);
  }
});
// UPDATE (protected)
// PUT /entries/:id
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const updated = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Item not found" });
    }

    return (res, "item updated", updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// DELETE (protected)
// DELETE /entries/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Item.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!deleted) {
      return res.status(404).json({ error: "item not found" });
    }

    return (res, "item deleted", { id: deleted._id });
  } catch (err) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
});
module.exports = router;
*/
