const express = require('express');

const {loginUser,addUser} = require('../controllers/user');
const route = express.Router()

route.post('/login',loginUser)
route.post('/register',  addUser)
module.exports = route;