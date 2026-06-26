const Camp = require("../models/camp");
const Bookings = require("../models/bookings");

exports.getAllCamps = async (req, res) => {
  try {
    const camps = await Camp.find()
      .populate("host", "fullName");

    res.status(200).json(camps);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.getCampDetails = async (req, res) => {
  try {

    const {campId}= req.params;
    const camp = await Camp.findById(req.params.campId)
      .populate("host", "fullName");

    if (!camp) {
      return res.status(404).json({
        error: "Camp not found"
      });
    }

    res.status(200).json(camp);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};