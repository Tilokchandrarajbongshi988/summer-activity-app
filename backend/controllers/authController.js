const User = require("../models/user");

const bcrypt =require("bcrypt");

const generateTokenAndSetCookie = require("../utils/geneWebToken");


exports.postSignUp = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword, userType} = req.body;
    console.log(req.body);

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords don't match" })
    }
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ error: "email already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      userType
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      userType: newUser.userType,
    });

  } catch (error) {
    console.log("Error in signup controller:", error.message);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    console.log(isPasswordCorrect)
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    };
    generateTokenAndSetCookie(user._id, res);
     res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      userType: user.userType,
    });

  } catch (error) {
    console.log("error in login controller", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

exports.postLogout =async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0}); //res.cookie(name, value, options);
    res.status(200).json({message: "logged out successfully"});
  } catch (error) {
    console.log("error in logout controller", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}
exports.getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};
