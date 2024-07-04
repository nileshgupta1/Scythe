const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateTokens');

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You already have account");

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("User Created Succesfully");
                }
            });
        });
    } catch (error) {
        res.send(error.message);
    }
};


module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (!user) return res.send("Email or password incorrect");

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
            }
            else {
                res.send("Email or password incorrect");
            }
        });

    } catch (error) {
        res.send(error.message);
    }
};

module.exports.logoutUser = function (req, res) {
    res.cookie('token', "");
    res.redirect('/');
}