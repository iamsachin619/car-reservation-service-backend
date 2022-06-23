const mongoose = require('mongoose');


const smallBooking = new mongoose.Schema({
    booking_id: {type:String},
    to_time: {type:Date},
    from_time:{type:Date}
})
const CarSchema = new mongoose.Schema({
    bookings: [],
    car_name: {
        type: String,
        required: true
    },
    car_model: {
        type: String,
        required: true
    },
    car_color: {
        type: String,
        required: true
    },
    car_number: {
        type: String,
        required: true,
        unique: true
    },
    car_image: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    car_price_per_hour:{
        type: Number,
        required: true
    },
    car_driven: {
        type: Number,
        required: true
    },
    car_type: {
        type: String,
        required: true

    },
    car_fuel_type: {
        type: String,
        required: true
    },
    car_gear_type: {
        type: String,
        required: true
    },
    car_seats: {
        type: Number,
        required: true
    },
    car_tyre_type: {
        type: String,
        required: true
    }},{collection: 'cars'});

    const Car = mongoose.model('Car', CarSchema);
    module.exports = Car;