const mongoose = require("mongoose");
const ProductLineItem = require("../models/productLineItem.model.js");

const createProductLineItem = async (req, res) => {
  try {
    const item = await ProductLineItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProductLineItems = async (req, res) => {
  try {
    const items = await ProductLineItem.find()
      .populate("Account__c")
      .populate("Product__c")
      .populate("OwnerId");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an Productt by ID
const updateproductLineItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Product ID" });
    }

    const updateproductLineItem = await productLineItem.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updateproductLineItem) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updateproductLineItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createProductLineItem,
  getAllProductLineItems,
  updateproductLineItem
};
