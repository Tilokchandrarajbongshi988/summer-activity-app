const User = require("../models/user");
const Camp = require("../models/camp");

exports.getFavourites = async (req, res) => {
  try {

    const user = await User.findById(req.user._id)
      .populate("favourites");

    res.status(200).json(user.favourites);

  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.toggleFavourite = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    const campId = req.params.campId;

    const camp = await Camp.findById(campId);

    if (!camp) {
      return res.status(404).json({
        error: "Camp not found"
      });
    }

    const alreadyFavourite = user.favourites.includes(campId);

    if (alreadyFavourite) {

      user.favourites.pull(campId);

    } else {

      user.favourites.push(campId);

    }

    await user.save();

    res.status(200).json({
      favourites: user.favourites,
    });

  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};