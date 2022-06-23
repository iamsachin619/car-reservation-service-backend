const Bookings = require('../models/booking');
const Cars = require('../models/car');
const Owner = require('../models/owner');
const Owners = require('../models/owner');
const User = require('../models/user');

const {createError} = require('../util/createError');

const CreateBookingsByUser = async (req, res, next) => {
    try{
        const userId = req._id;
        const carId = req.body.car_id;
        const user = await User.findById(userId)
        const car = await Cars.findById(carId)
        const to = new Date(req.body.to_time);
        const from = new Date(req.body.from_time);
        //get hour diffrecnce
        const diff = to.getTime() - from.getTime();
        const diffHours = diff / (1000 * 3600);
        console.log(diffHours);
        console.log({user_id: userId, car_id: carId, to_time: to, from_time: from,price: diffHours * car.car_price_per_hour
            , to_place : req.body.to_place, from_place : req.body.from_place
            })
        if(user.wallet <  diffHours * car.car_price_per_hour) return next(createError(400, "Not enough money in wallet"));


        const booking = new Bookings({user_id: userId, car_id: carId, to_time: to, from_time: from,price: diffHours * car.car_price_per_hour
        , to_place : req.body.to_place, from_place : req.body.from_place
        });
        const newBooking = await booking.save();
        console.log("newBooking",newBooking);
        const updatedUser = await User.findByIdAndUpdate(userId, {$inc: {wallet: -diffHours * car.car_price_per_hour},$push:{bookings: booking._id}}, {new: true});
        const updatedCar = await Cars.findByIdAndUpdate(carId, {$push:{bookings: {booking_id:booking._id, to_time:to,from_time:from}}}, {new: true});
        const updateOwner = await Owner.findByIdAndUpdate(car.owner_id, {$push:{bookings: booking._id}}, {new: true});

        // console.log(updatedUser, updatedCar, updateOwner);
        res.status(200).json(newBooking);
    }catch(err){
        next(err);
    }
}

module.exports = {CreateBookingsByUser};


