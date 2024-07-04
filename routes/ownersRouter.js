const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

// This route should be available only in development environment
// if(process.env.NODE_ENV == 'development')
router.post('/create', async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
        return res.status(504).send('You dont have permission to create new owner');
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password
    })
    res.status(201).send(createdOwner);
})

router.get('/admin', function (req, res) {
    // let success = req.flash('success');
    let success = [];
    res.render("createproducts", { success });
});


module.exports = router;