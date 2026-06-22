const Camp = require("../models/camp");

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
exports.updateCamp = async (req, res) => {
  try {
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