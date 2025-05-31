const ProductLineItem = require("../models/productLineItem.model");

const filteration = async (req, res) => {
  const filters = req.body;
  console.log("Received filters:", filters);

  try {
    // Step 1: Fetch with population
    const items = await ProductLineItem.find()
      .populate("Account__c")
      .populate("Product__c");

    let filteredItems = items.filter(item => {
      const acc = item.Account__c;
      const prod = item.Product__c;
      if (!acc || !prod) return false;

      // 🔹 Height
      const height = acc.Height_in_Centimeters__c;
      let heightMatch = true;
      if (filters.height_173_178 || filters.height_179_182 || filters.height_above_183) {
        heightMatch = false;
        if (filters.height_173_178 && ["173 CM", "174 CM", "175 CM", "176 CM", "177 CM", "178 CM"].includes(height)) heightMatch = true;
        if (filters.height_179_182 && ["179 CM", "180 CM", "181 CM", "182 CM"].includes(height)) heightMatch = true;
        if (filters.height_above_183 && ["183 CM", "184 CM", "185 CM", "186 CM", "187 CM", "188 CM", "189 CM", "190 CM", "Above 190 CM"].includes(height)) heightMatch = true;
      }

      // 🔹 Age
      const age = acc.Age__c;
      let ageMatch = true;
      if (filters.age_below_25 || filters.age_25_30 || filters.age_30_35 || filters.age_above_35) {
        ageMatch = false;
        if (filters.age_below_25 && age < 25) ageMatch = true;
        if (filters.age_25_30 && age >= 25 && age <= 30) ageMatch = true;
        if (filters.age_30_35 && age > 30 && age <= 35) ageMatch = true;
        if (filters.age_above_35 && age > 35) ageMatch = true;
      }

      // 🔹 Build Type
      const build = prod.Bouncer_Build__c;
      let buildMatch = true;
      if (filters.lean || filters.medium || filters.heavy) {
        buildMatch = false;
        if (filters.lean && build === "Lean Built") buildMatch = true;
        if (filters.medium && build === "Medium Built") buildMatch = true;
        if (filters.heavy && build === "Heavy Built") buildMatch = true;
      }

      return heightMatch && ageMatch && buildMatch;
    });

    const matchedAccounts = filteredItems.map(item => item.Account__c);
    res.status(200).json(matchedAccounts);
  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  filteration,
};
