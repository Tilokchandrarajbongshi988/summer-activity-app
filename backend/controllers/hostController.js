const Camp = require("../models/camp");
const Booking = require("../models/bookings");
const User = require("../models/user");

const MAX_IMAGE_SIZE = 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const validateCampPhoto = (photo) => {
  if (!photo) {
    return null;
  }

  const match = photo.match(/^data:(image\/jpeg|image\/png);base64,(.+)$/);

  if (!match) {
    return "Only JPG and PNG images are allowed";
  }

  const imageSize = Buffer.byteLength(match[2], "base64");

  if (imageSize > MAX_IMAGE_SIZE) {
    return "Image must be 1 MB or smaller";
  }

  if (!ALLOWED_IMAGE_TYPES.includes(match[1])) {
    return "Only JPG and PNG images are allowed";
  }

  return null;
};

exports.createCamp = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    if (req.user.userType !== "host") {
      return res.status(403).json({
        error: "only hosts can create camps"
      });
    }
    const { activityName, description, price, location, photo } = req.body;
    const photoError = validateCampPhoto(photo);

    if (photoError) {
      return res.status(400).json({
        error: photoError,
      });
    }

    const camp = await Camp.create({
      activityName,
      description,
      price,
      location,
      photo,
      host: req.user._id
    })
    res.status(201).json(camp);
  } catch (error) {
    console.log("Error creating camp:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }

};

exports.getMyCamps = async (req, res) => {
  try {

    const camps = await Camp.find({
      host: req.user._id
    });

    res.status(200).json(camps);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

exports.getCampById = async (req, res) => {
  try {

    const camp = await Camp.findOne({
      _id: req.params.campId,
      host: req.user._id,
    });

    if (!camp) {
      return res.status(404).json({
        error: "Camp not found",
      });
    }

    res.status(200).json(camp);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.updateCamp = async (req, res) => {
  try {
    const photoError = validateCampPhoto(req.body.photo);

    if (photoError) {
      return res.status(400).json({
        error: photoError,
      });
    }

    const updatedCamp = await Camp.findOneAndUpdate(
      {
        _id: req.params.campId,
        host: req.user._id,
      },
      req.body,
      {
        returnDocument: "after",
      }
    );

    if (!updatedCamp) {
      return res.status(404).json({
        error: "Camp not found or unauthorized",
      });
    }

    res.status(200).json(updatedCamp);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};


exports.deleteCamp = async (req, res) => {
  try {
    const camp = await Camp.findById(req.params.campId);
    if (!camp) {
      return res.status(404).json({
        error: "Camp not found",
      });
    }

    if (camp.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: "Unauthorized",
      });
    }

    await Booking.deleteMany({
      camp: camp._id,
    });

    await User.updateMany(
      {
        favourites: camp._id,
      },
      {
        $pull: {
          favourites: camp._id,
        },
      }
    );

    await Camp.findByIdAndDelete(req.params.campId);

    res.status(200).json({
      message: "Camp deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
