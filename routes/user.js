const express = require('express');
const {User,addUser, editUser,deleteUser} = require('../controllers/user');
const {getCars} = require('../controllers/car');
const {CreateBookingsByUser} = require('../controllers/booking');
const {verifyToken,verifyUser} = require('../util/verifyToken');

const route = express.Router();




route.post('/getCars', getCars)

route.post('/editUser',verifyToken,verifyUser, editUser)

route.delete('/deleteUser', verifyToken,verifyUser, deleteUser)

route.post('/bookingCreation',verifyToken, verifyUser, CreateBookingsByUser)

module.exports = route;
