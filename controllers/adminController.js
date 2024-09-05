const Admin = require('../models/Admin');
//const cookieToken = require('../utils/cookieToken');
const admincookieToken = require('../utils/admincookieToken');
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2;
const User=require('../models/User');
const Adminhired = require('../models/Adminhired');


// Register/SignUp user
exports.register = async (req, res) => {
  try {
    const { name,citizenid,joiningid,municipality,email,contact, address,password } = req.body;
    

    if (!citizenid || !joiningid || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    // check if user is already registered
    let admin = await Admin.findOne({ joiningid });
    
    const hiredverify=await Adminhired.find({joiningid,municipality,password})
    
    if (admin ) {
      return res.status(400).json({
        message: 'User already registered! ',
      });
    }
    if(hiredverify.length<=0){
      
      return res.status(400).json({
        message: 'your hired details are not matched',
      });
    }
    
   
    admin = await Admin.create({
      name,
      citizenid,
      joiningid,
      municipality:municipality?.toLowerCase(),
      email, 
      contact,
      address,
      password,
    });
    

    // after creating new user in DB send the token
    admincookieToken(admin, res);
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
    const { joiningid, password } = req.body;

    // check for presence of email and password
    if (!joiningid || !password) {
      return res.status(400).json({
        message: 'Email and password are required!',
      });
    }

    const admin = await Admin.findOne({ joiningid });

    if (!admin) {
      return res.status(400).json({
        message: 'User does not exist!',
      });
    }

    // match the password
    const isPasswordCorrect = await admin.isValidatedPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Email or password is incorrect!',
      });
    }

    // if everything is fine we will send the token
    admincookieToken(admin, res);
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
exports.updateAdminDetails = async (req, res) => {
  try {
    const { name,contact,email,address, joiningid, picture } = req.body

    const admin = await Admin.findOne({ joiningid })

    if (!admin) {
      return res.status(404), json({
        message: 'Admin not found'
      })
    }

    // user can update only name, only password,only profile pic or all three

    admin.name = name
    admin.email = email
    admin.contact = contact
    admin.address = address
    admin.picture = picture
    const updatedAdmin = await admin.save()
    admincookieToken(updatedAdmin, res)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }, error)
  }
}

// Logout
exports.logout = async (req, res) => {
  res.cookie('admintoken', null, {
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
//get all user
exports.getAllUser = async (req, res) => {
  try {
    const municipality=req.admin.municipality
    
    const alluser = await User.find({municipality:municipality});
    res.status(200).json({
      alluser,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
//get single user
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: 'Place not found',
      });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal serever error',
    });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const searchword = req.params.key;
    const admindata=req.admin
    if (!admindata) {
      return res.status(401).json({
        message: 'you are not authorized!',
      });
    }

    if (searchword.length ===1 || searchword.length ===0) return res.status(200).json(await User.find({municipality:admindata.municipality }))

    const searchMatches = await User.find({ citizenid: { $regex: searchword, $options: "i" },municipality:admindata.municipality })

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Internal serever error 1',
    });
  }
}

