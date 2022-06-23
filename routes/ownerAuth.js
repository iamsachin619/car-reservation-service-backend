const express = require('express');
const {ownerLogin,addOwner} = require('../controllers/owner');

const router = express.Router();

router.post('/login', ownerLogin);

router.post('/createOwner', addOwner);
module.exports = router;