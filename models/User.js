const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamp: true});


// create model
const User = mongoose.model('user', userSchema);

// export model
module.exports = User