const express = require('express');
const router = express.Router();
const { adminisLoggedIn, isLoggedIn } = require('../middlewares/user');

const {
  addScheme,
  getScheme,
  singleScheme,
  updateScheme,
  getSpecificTypeScheme,
  deleteScheme,
  getAdminScheme,
  usersearchScheme,
  adminsearchScheme,
 
} = require('../controllers/schemeController');

router.route('/').get(isLoggedIn,getScheme);
router.route('/adminscheme').get(adminisLoggedIn ,getAdminScheme);

router.route('/:type').get(getSpecificTypeScheme);

router.route('/add-scheme').post(adminisLoggedIn, addScheme);

router.route('/delete-scheme/:id').delete(adminisLoggedIn, deleteScheme);

//router.route('/admin-area-scheme').get(adminisLoggedIn, adminAreaScheme);

router.route('/update-scheme').put(adminisLoggedIn, updateScheme);


// Not Protected routed but sequence should not be interfered with above routes
router.route('/single-scheme/:id').get(singleScheme);
router.route('/usersearch/:key').get(isLoggedIn,usersearchScheme)
router.route('/adminsearch/:key').get(adminisLoggedIn ,adminsearchScheme)


module.exports = router;
