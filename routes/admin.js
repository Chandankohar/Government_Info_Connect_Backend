const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: '/tmp' });

const {
  register,
  login,
  logout,
  uploadPicture,
  updateAdminDetails,
  getAllUser,
  getSingleUser,
  searchUser,
} = require('../controllers/adminController');
const { adminisLoggedIn } = require('../middlewares/user');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/upload-picture').post(upload.single('picture', 1), uploadPicture)
router.route('/update-admin').put(updateAdminDetails)
router.route('/logout').get(logout);
router.route('/alluser').get(adminisLoggedIn,getAllUser);
router.route('/specific-user/:id').get(getSingleUser);
router.route('/getuser/search/:key').get(adminisLoggedIn,searchUser)

module.exports = router;
