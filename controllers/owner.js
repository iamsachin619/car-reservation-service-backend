const Owner = require('../models/owner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { trusted } = require('mongoose');
const { createError } = require('../util/createError');
const Car = require('../models/car')

//auth of owner
const ownerLogin = async (req, res, next) => {
    try {
        const owner = await Owner.findOne({ email: req.body.email });
        if (!owner) return next(createError(404, "Owner user not found!"));
        const isMatch = await bcrypt.compare(req.body.password, owner.password);
        if (!isMatch) return next(createError(404, "Invalid password!"));
        const token = jwt.sign({ id: owner._id, type:'Owner' }, process.env.JWT_SECRET);
        console.log(owner)
        const {password, ...rest} = owner._doc
        res.cookie('access_token', token, { httpOnly: true }).json(rest);
    }catch(err) {
        next(err);
    }
}

//CRUD operations
//add owner
const addOwner = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const owner = req.body;
        const newOwner = new Owner({...owner, password: hash});
        const addedOwner = await newOwner.save();
        res.status(200).send("Owner has been created.");
    }catch(err) {
        next(err);
    }
}

//edit owner
const editOwner = async (req, res, next) => {
    try {
        const owner = req.body;
        const editedOwner = await Owner.findByIdAndUpdate(owner._id, owner, {new: true});
        res.status(200).json(editedOwner);
    }catch(err) {
        next(err);
    }
}

//delete owner
const deleteOwner = async (req, res, next) => {
    try {
        const owner = req.body;
        await Owner.findByIdAndDelete(owner._id,{new: true});
        res.status(200).send("Owner has been deleted.");
    }catch(err) {
        next(err);
    }
}

//get owner
const getOwner = async (req, res, next) => {
    try {
        const {id} = req.body;
        const owner = await Owner.findById(id,{new: true});
        res.status(200).json(owner);
    }catch(err) {
        next(err);
    }
}

//get owners
const getOwners = async (req, res, next) => {
    try {
        const {filter, sort } = req.query;
        const owners = await Owner.find({$eq: filter},{new: true}).sort(sort)
        res.status(200).json(owners);
    }catch(err) {
        next(err);
    }
}

//get all cars by particular owner
const getAllOwnedCars = async  (req, res, next) => {
    try {
        const {_id } = req.body;
        
        const allCars = await Car.find({owner_id:{$eq: _id}})
        res.status(200).json(allCars);
    }catch(err) {
        next(err);
    }
}

//delete car from car collection and owner doc
const delCarOfOwner = async  (req, res, next) => {
    try {
        const {_id, car_id } = req.body;
        await Owner.updateOne({_id: _id},{$pull: {cars:{$eq:car_id}}})
        await Car.deleteOne({_id:car_id, owner_id:_id}, { new: true });
        const allCars = await Car.find({owner_id:{$eq: _id}})
        res.status(200).json(allCars);
    }catch(err) {
        next(err);
    }
}
module.exports = {addOwner, editOwner, deleteOwner, getOwner, getOwners,ownerLogin,getAllOwnedCars,delCarOfOwner};