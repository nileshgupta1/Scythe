const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://nilesh147k:N!lesh123@socialmedia.kgk7zum.mongodb.net/scythe?retryWrites=true&w=majority&appName=SocialMedia')
    .then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose.connection;