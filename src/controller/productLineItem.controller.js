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

module.exports = {
  createProductLineItem,
  getAllProductLineItems,
};
