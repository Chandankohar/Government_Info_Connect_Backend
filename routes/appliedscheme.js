const express = require('express');
const router = express.Router();
const { isLoggedIn, adminisLoggedIn } = require('../middlewares/user');

const {
  applyOnScheme,
  getUserAppliedScheme,
  SingleAppliedScheme,
  getAllUserSchemeApplication,
  statusOfAppliedScheme,
  getUserScheme,
  getSearchUserAppliedScheme,
  deleteUserAppliedScheme,
} = require('../controllers/appliedschemeController');

// Protected routes (user must be logged in)
router.route('/').get(isLoggedIn, getUserAppliedScheme).post(isLoggedIn, applyOnScheme);
router.route('/:id').get(SingleAppliedScheme)
router.route('/allusersapplyscheme/:id').get(adminisLoggedIn, getAllUserSchemeApplication)
router.route('/applyschemestatus/:id').post(adminisLoggedIn, statusOfAppliedScheme)
router.route('/userscheme/:id').get(adminisLoggedIn, getUserScheme)
router.route('/searchuser/:id/:key').get(adminisLoggedIn,getSearchUserAppliedScheme)
router.route('/deleteuserscheme/:id').delete(isLoggedIn,deleteUserAppliedScheme)


module.exports = router;
