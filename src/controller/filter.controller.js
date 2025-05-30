const Account = require("../models/account.model.js");

const filteration = async (req, res) => {
  const filters = req.body;
  console.log("Received filters:", filters);

  try {
    if (filters.filters_type === 0) {
      let items = await Account.find();
      console.log("Total Accounts found:", items.length);

      let filteredItems = items.filter((item) => {
        const height = item.Height_in_Centimeters__c?.trim();
        const age = Number(item.Age__c);

        // Height Match
        let heightMatch = true;
        if (
          filters.below_175 ||
          filters.Range_175_180 ||
          filters.Range_180_185 ||
          filters.above_185
        ) {
          heightMatch = false;
          if (filters.below_175 && ["173 CM", "174 CM"].includes(height)) heightMatch = true;
          if (filters.Range_175_180 && ["175 CM", "176 CM", "178 CM", "179 CM", "180 CM"].includes(height)) heightMatch = true;
          if (filters.Range_180_185 && ["181 CM", "182 CM", "183 CM", "184 CM", "185 CM"].includes(height)) heightMatch = true;
          if (filters.above_185 && ["186 CM", "187 CM", "188 CM", "189 CM", "190 CM", "Above 190 CM"].includes(height)) heightMatch = true;
        }

        // Age Match
        let ageMatch = true;
        if (
          filters.below_25 ||
          filters.Range_25_30 ||
          filters.Range_30_35 ||
          filters.above_35
        ) {
          ageMatch = false;
          if (filters.below_25 && age < 25) ageMatch = true;
          if (filters.Range_25_30 && age >= 25 && age <= 30) ageMatch = true;
          if (filters.Range_30_35 && age > 30 && age <= 35) ageMatch = true;
          if (filters.above_35 && age > 35) ageMatch = true;
        }

        return heightMatch && ageMatch;
      });

      console.log("Filtered Items:", filteredItems.length);
      res.status(200).json(filteredItems);
    } else if (filters.filters_type === 1) {
    
    } else {
      res.status(400).json({ message: "Invalid filters_type" });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  filteration,
};

  // try {
  //   let items = await ProductLineItem.find()
  //     .populate("Account")
  //     .populate("Product");
    
  //     console.log(items);

  //   let filteredItems = items.filter((item) => {
  //     const acc = item.Account;
  //     const prod = item.Product;

  //     if (!acc || !prod) return false;

  //     const height = acc.Height_in_Centimeters__c?.trim();
  //     const build = prod.Bouncer_Build__c?.trim();
  //     const age = Number(acc.Age__c);

  //     let heightMatch = true;
  //     if (
  //       filters.below_175 ||
  //       filters.Range_175_180 ||
  //       filters.Range_180_185 ||
  //       filters.above_185
  //     ) {
  //       heightMatch = false; 
  //       if (filters.below_175 && ["173 CM", "174 CM"].includes(height))
  //         heightMatch = true;
  //       if (
  //         filters.Range_175_180 &&
  //         ["175 CM", "176 CM", "178 CM", "179 CM", "180 CM"].includes(height)
  //       )
  //         heightMatch = true;
  //       if (
  //         filters.Range_180_185 &&
  //         ["181 CM", "182 CM", "183 CM", "184 CM", "185 CM"].includes(height)
  //       )
  //         heightMatch = true;
  //       if (
  //         filters.above_185 &&
  //         ["186 CM", "187 CM", "188 CM", "189 CM", "190 CM", "Above 190 CM"].includes(
  //           height
  //         )
  //       )
  //         heightMatch = true;
  //     }

  //     let buildMatch = true;
  //     if (filters.medium || filters.lean || filters.heavy) {
  //       buildMatch = false;
  //       if (filters.medium && build === "Medium Built") buildMatch = true;
  //       if (filters.lean && build === "Lean Built") buildMatch = true;
  //       if (filters.heavy && build === "Heavy Built") buildMatch = true;
  //     }

  //     let ageMatch = true;
  //     if (
  //       filters.below_25 ||
  //       filters.Range_25_30 ||
  //       filters.Range_30_35 ||
  //       filters.above_35
  //     ) {
  //       ageMatch = false;
  //       if (filters.below_25 && age < 25) ageMatch = true;
  //       if (filters.Range_25_30 && age >= 25 && age <= 30) ageMatch = true;
  //       if (filters.Range_30_35 && age > 30 && age <= 35) ageMatch = true;
  //       if (filters.above_35 && age > 35) ageMatch = true;
  //     }

  //     return heightMatch && buildMatch && ageMatch;
  //   });

  //   const bouncers = filteredItems.map((item) => item.Account__c);
  //   console.log(bouncers);
  //   res.status(200).json(bouncers);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: "Server error" });
  // }


module.exports = {
  filteration,
};
