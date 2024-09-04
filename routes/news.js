const express = require('express');
const router = express.Router();
const { adminisLoggedIn, isLoggedIn } = require('../middlewares/user');
const { getAdminNews, getUserNews, AddNews, singleNews, updateNews, deleteNews, getAllNews } = require('../controllers/newsController');


router.route('/adminnews').get(adminisLoggedIn ,getAdminNews).post(adminisLoggedIn ,AddNews);
router.route('/usernews').get(isLoggedIn ,getUserNews);
router.route('/').get(getAllNews);
router.route('/single-news/:id').get(singleNews);
router.route('/update-news').put(adminisLoggedIn, updateNews);
router.route('/delete-news/:id').delete(adminisLoggedIn, deleteNews);
module.exports = router;