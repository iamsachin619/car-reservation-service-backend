const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wallet:{
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    
    
    bookings: [{
        type: String,
        required: true
    }]   
},
{ collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;



