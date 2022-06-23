const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true

    },
    name:{
        type: String,
        required: true
    },
    contact_number:{
        type: String,
        required: true
    },
    wallet:{
        type: Number,
        required: true

    },
    bookings: [{
        type: String,
        required: true
    }],
    cars: [{
        type: String,
        required: true
    }]
},{collection: 'owners'});


const Owner = mongoose.model('Owner', OwnerSchema);

module.exports = Owner;