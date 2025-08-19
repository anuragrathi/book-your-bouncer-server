const Account = require("../models/account.model");
const Reservation = require("../models/cart.model");

const addToReservation = async (req, res) => {
  try {
    const { bouncerid, guestid } = req.body;
    const userId = req.user ? req.user._id : null; 

    const bouncer = await Account.findById(bouncerid);
    if (!bouncer) {
      return res.status(404).json({ message: "Bouncer not found" });
    }

    const query = userId ? { Bouncerid: bouncerid, userid: userId } : { Bouncerid: bouncerid, guestid };

    const existing = await Reservation.findOne(query);
    if (existing) {
      return res.status(200).json({ message: "Already Reserved" });
    }

    const newReservation = await Reservation.create({
      Bouncerid: bouncerid,
      userid: userId || null,
      guestid: userId ? null : guestid,
      name: `${bouncer.FirstName} ${bouncer.LastName}`,
      img: bouncer.Profile_Image__c,
    });

    return res.status(201).json({ message: "Added to Reservation", data: newReservation });
  } catch (error) {
    console.error("❌ Error in addToReservation:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllReservation = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const { guestid } = req.body;

    const filter = userId ? { userid: userId } : { guestid };

    const ReserveBouncer = await Reservation.find(filter);
    return res.status(200).json(ReserveBouncer);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeReservation = async (req, res) => {
  try {
    const { cartbouncerid, guestid } = req.body;
    const userId = req.user ? req.user._id : null;

    if (!cartbouncerid && !guestid && !userId) {
      return res.status(400).json({ message: "Reservation ID or user info required" });
    }

    const filter = userId ? { _id: cartbouncerid, userid: userId } : { _id: cartbouncerid, guestid };

    const deletedReservation = await Reservation.findOneAndDelete(filter);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Reservation deleted successfully",
      data: deletedReservation,
    });
  } catch (error) {
    console.error("Reserved Bouncer Not Removed", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const mergeCart = async (req, res) => {
  const { guestId } = req.body;
  const userId = req.user._id;

  try {
    if (!guestId) {
      return res.status(400).json({ message: "Guest ID required" });
    }

    await Reservation.updateMany(
      { guestid: guestId },
      { $set: { userid: userId, guestid: null } }
    );

    return res.json({ message: "Cart merged successfully" });
  } catch (error) {
    console.error("Merge cart error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addToReservation,
  getAllReservation,
  removeReservation,
  mergeCart,
};
