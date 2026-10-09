const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");

//Home Page
const homePage = (req, res) => {
  res.send("Home Page");
};

//Create User
const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    //Validating User - if the email is already redistered or not
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(409).json({
        message: "Email already Registered",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashpassword,
      role,
    });
    await newUser.save();

    res.status(200).json({
      message: "User Created",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Update User
const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true },
    );

    if (!user) {
      return res.status(400).json({
        message: "User not Exist",
      });
    }
    res.status(200).json({
      message: "User Updated",
    });
  } catch (err) {
    next(err);
  }
};

//Get Route
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User not exist",
      });
    }

    res.status(200).json({
      message: "User Exist",
      user,
    });
  } catch (err) {
    next(err);
  }
};

//Delete Route
const userDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(400).json({
        message: "User not exist",
      });
    }

    res.status(200).json({
      message: "User Deleted",
    });
  } catch (err) {
    next(err);
  }
};

//Login Route
const loginUser = async (req, res, next) => {
  try{
     const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not exist",
    });
  }

  const compare = await bcrypt.compare(password, user.password);
  if (compare) {
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
    );
    return res.status(200).json({
      message: "User LoggedIn Successfull",
      token,
    });
    
  } else {
    res.status(400).json({
      message: "User does not exist",
    });
  }

  }catch(err){
    next(err)
  }
 
};

module.exports = {
  homePage,
  createUser,
  updateUser,
  getUser,
  userDelete,
  loginUser,
};
