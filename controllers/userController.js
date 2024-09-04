const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2;


// Register/SignUp user
exports.register = async (req, res) => {
  try {
    const { name,citizenid,addedPhotos,address,municipality, email, password, } = req.body;
    
    if (!citizenid || !municipality || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    // check if user is already registered
    let user = await User.findOne({ citizenid });

    if (user) {
      return res.status(400).json({
        message: 'User already registered!',
      });
    }
    
    user = await User.create({
      name,
      citizenid,
      citizenshipphoto:addedPhotos,
      address,
      municipality:municipality.toLowerCase(), 
      email, 
      password,
    });
    

    // after creating new user in DB send the token
    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

// Login/SignIn user
exports.login = async (req, res) => {
  try {
    const { citizenid, password } = req.body;

    // check for presence of email and password
    if (!citizenid || !password) {
      return res.status(400).json({
        message: 'Email and password are required!',
      });
    }

    const user = await User.findOne({ citizenid });

    if (!user) {
      return res.status(400).json({
        message: 'User does not exist!',
      });
    }

    // match the password
    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Email or password is incorrect!',
      });
    }
    
    // if everything is fine we will send the token
    cookieToken(user, res);
    
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};



// Upload picture
exports.uploadPicture = async (req, res) => {
  const { path } = req.file
  try {
    let result = await cloudinary.uploader.upload(path, {
      folder: 'Airbnb/Users',
    });
    res.status(200).json(result.secure_url)
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
}

// update user
exports.updateUserDetails = async (req, res) => {
  try {
    const { name,contact,email,address, citizenid, picture } = req.body
console.log(req.body)
    const user = await User.findOne({ citizenid })

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    // user can update only name, only password,only profile pic or all three

    user.name = name
    user.email = email
    user.contact = contact
    user.address = address
    if(picture){
    user.picture = picture}
    
    const updatedUser = await user.save()
    cookieToken(updatedUser, res)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }, error)
  }
}

// Logout
exports.logout = async (req, res) => {
  res.cookie('usertoken', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,   // Only send over HTTPS
    sameSite: 'none' // Allow cross-origin requests
  });
  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
};
