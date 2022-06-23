const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    car_id: {
        type: String,
        required: true
    },
    // owner_id: {
    //     type: String,
    //     required: true
    // },
    user_id: {
        type: String,
        required: true
    },
    from_time: {
        type: Date,
        required: true
    },
    to_time: {
        type: Date,
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    to_place:{
        type: String,
        required: true
    },
    from_place:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }},{collection: 'bookings'});

    const Booking = mongoose.model('Booking', BookingSchema);

    module.exports = Booking;