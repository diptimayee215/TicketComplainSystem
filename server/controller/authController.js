// const User = require('../model/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Generate JWT Token
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// // @desc    Register new user
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user (Default role is 'user'. To create an admin, manually change in DB or add logic here)
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     if (user) {
//       res.status(201).json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user.id, user.role),
//       });
//     } else {
//       res.status(400).json({ message: 'Invalid user data' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Authenticate a user
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check for user email
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user.id, user.role),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Logout user
// // @route   POST /api/auth/logout
// // @access  Public
// const logoutUser = (req, res) => {
//   // Since we are using JWT (stateless), logout is handled on client by removing token.
//   // We just send a success message here.
//   res.status(200).json({ message: 'Logged out successfully' });
// };

// // @desc    Get user data
// // @route   GET /api/auth/me
// // @access  Private
// const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   logoutUser,
//   getMe,
// };



const User = require("../model/User");   // ← FIXED: models not model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getMe };