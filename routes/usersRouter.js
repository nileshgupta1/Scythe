const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');


router.get('/', function (req, res) {
    res.send("users");
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);


router.post

module.exports = router;