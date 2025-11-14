// User routes
const express = require('express');
const router = express.Router();
const { getUsers, getProfile } = require('../controllers/userController');
const isValidToken = require('../middleware/auth');

router.get('/users', isValidToken, getUsers);
router.get('/profile', isValidToken, getProfile);

module.exports = router;

