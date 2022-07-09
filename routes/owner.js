const express = require('express');
const {verifyToken,verifyOwner} = require('../util/verifyToken');
const {editOwner ,getAllOwnedCars} = require('../controllers/owner');
const { addCar, deleteCar, editCarOwner } = require('../controllers/car');
const route = express.Router();

route.post('/edit',verifyToken,verifyOwner, editOwner);
route.post('/addCar', verifyToken, verifyOwner, addCar);
route.post('/deleteCar', verifyToken, verifyOwner, deleteCar);
route.post('/editCar', verifyToken, verifyOwner, editCarOwner);
route.post('/getAllCars', verifyToken, verifyOwner,getAllOwnedCars)
module.exports = route