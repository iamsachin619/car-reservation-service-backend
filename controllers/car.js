var url = require('url');
const Car = require("../models/car");
const Owner = require('../models/owner')
const { createError } = require("../util/createError");
//add car
const addCar = async (req, res, next) => {
  const owner_id = req._id;
  try {
    const { _id, ...car } = req.body;
    const newCar = new Car({ ...car, owner_id: owner_id });
    const addedCar = await newCar.save();
    
    //update owner with new car
    const owner = await Owner.findByIdAndUpdate(owner_id,  
      { $push: { cars: addedCar._id } },
       { new: true });
    console.log(owner);
    res.status(200).json(addedCar);
    //.send("Car has been created.");
    return;
  } catch (err) {
    next(err);
  }
};

//edit car
const editCarOwner = async (req, res, next) => {
  try {
    const car = req.body;
    const owner_id = req._id;

    const { _id, ...editCar } = car;

    const editedCar = await Car.findOneAndUpdate(
      { _id: car.car_id, owner_id: owner_id },
      editCar,
      { new: true }
    );

    if (editedCar.length === 0) return next(createError(404, "Car not found"));
    res.status(200).json(editedCar);
  } catch (err) {
    next(err);
  }
};

//delete car
const deleteCar = async (req, res, next) => {
  try {
    const car = req.body;
    await Car.findByIdAndDelete(car._id, { new: true });
    res.status(200).send("Car has been deleted.");
  } catch (err) {
    next(err);
  }
};

//get car
const getCar = async (req, res, next) => {
  try {
    const { car_id } = req.body;
    const car = await Car.findById(car_id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

//get cars
const getCars = async (req, res, next) => {
  try {
    const { filter, sort,dates} = req.body;
    let cars
    
    if(!dates){
       cars = await Car.find(filter).sort(sort);  
    } else{
       cars = await Car.find({ 
        $or : 
        [ { 
          "bookings" : { 
            $not :
          { $elemMatch : { "from_time" : { $lte : new Date(dates.to_time) }, "to_time" : { $gte : new Date(dates.from_time) } } } 
        } },
         { "bookings" : "[]" } ]
         , $and : [filter ] }).sort(sort)
    }
    
    //.sort(sort);
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};

//get cars gett
// const getCarsGET = async (req, res, next) => {
//   try {

    
//     // const { filter, sort,dates} = req.body;
//     // let cars
    
//     // if(!dates){
//     //    cars = await Car.find(filter).sort(sort);  
//     // } else{
//     //    cars = await Car.find({ 
//     //     $or : 
//     //     [ { 
//     //       "bookings" : { 
//     //         $not :
//     //       { $elemMatch : { "from_time" : { $lte : new Date(dates.to_time) }, "to_time" : { $gte : new Date(dates.from_time) } } } 
//     //     } },
//     //      { "bookings" : "[]" } ]
//     //      , $and : [filter ] }).sort(sort)
//     // }
    
//     // //.sort(sort);
//     // res.status(200).json(cars);
    
//     let query = req.query.filter.replace()
//     res.status(200).json(req.query.filter)
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = { addCar, editCarOwner, deleteCar, getCar, getCars };


function overlapping(s1,e1,s2,e2){
  if((s1 <= e2)  &&  (e1 >= s2)){
      console.log('overlapping')
  }else{
      console.log('not o')
  }
}

// db.foods.find({restaurants:{$elemMatch:{price:{$gt:23},{$lt:55}}}}).pretty()

//from studio 3t
//{ "bookings" : { $not : { $elemMatch : { "from_time" : { $lte : ISODate("2019-01-03T19:13:26.782+0000") }, "to_time" : { $gte : ISODate("2019-01-01T19:13:26.782+0000") } } } } }


//added or but not right algo
//{ $or : [ { "bookings" : { $not : { $elemMatch : { "from_time" : { $gte : ISODate("2022-06-21T19:23:03.634+0000") }, "bookings.from_time" : { $lte : ISODate("2022-06-21T19:23:23.056+0000") } } } } }, { $or : [ { "bookings" : []} ] } ] }

//better
//{ $or : [ { "bookings" : { $not : { $elemMatch : { "from_time" : { $lte : ISODate("2022-06-21T19:31:40.457+0000") }, "to_time" : { $gte : ISODate("2022-06-21T19:31:55.216+0000") } } } } }, { "bookings" : null } ] }

//99% this worked
//{ $or : [ { "bookings" : { $not : { $elemMatch : { "from_time" : { $lte : ISODate("2019-01-03T19:31:40.457+0000") }, "to_time" : { $gte : ISODate("2019-01-02T19:31:55.216+0000") } } } } }, { "bookings" : null } ] }

//with filter
//{ $or : [ { "bookings" : { $not : { $elemMatch : { "from_time" : { $lte : ISODate("2019-01-01T19:31:40.457+0000") }, "to_time" : { $gte : ISODate("2019-01-01T12:31:55.216+0000") } } } } }, { "bookings" : "[]" } ], $and : [ { "car_type" : "suv" }, { "car_color" : "red" } ] }