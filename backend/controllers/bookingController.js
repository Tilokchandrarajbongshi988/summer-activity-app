const Booking = require("../models/bookings");
const Camp = require("../models/camp");

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

exports.payAndBookCamp = async (req, res) => {
  try {
    if (req.user.userType !== "guest") {
      return res.status(403).json({
        error: "Only guests can book camps",
      });
    }

    const camp = await Camp.findById(req.params.campId);

    if (!camp) {
      return res.status(404).json({
        error: "Camp not found",
      });
    }

    const existingBooking = await Booking.findOne({
      user: req.user._id,
      camp: req.params.campId,
    });

    if (existingBooking) {
      return res.status(400).json({
        error: "You already booked this camp",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      camp: req.params.campId,
      paymentStatus: "paid",
      paymentMethod: "dummy",
      amountPaid: camp.price,
      paidAt: new Date(),
    });

    await booking.populate("camp");

    res.status(201).json({
      message: "Dummy payment successful. Booking confirmed.",
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
