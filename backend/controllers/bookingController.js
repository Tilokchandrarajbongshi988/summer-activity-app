const Booking = require("../models/bookings");

exports.bookCamp = async (req, res) => {
  try {

    const booking = await Booking.create({
      user: req.user._id,
      camp: req.params.campId,
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user._id,
    }).populate("camp");

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};