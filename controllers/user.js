const User = require('../models/user');
const {createError} = require('../util/createError');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) return next(createError(404, "User not found"));
        console.log(user.password)
        if (user.password !== password) return next(createError(401, "Wrong password"));
        const token = jwt.sign({ id: user._id, type:'User' }, process.env.JWT_SECRET);
        delete user._doc.password
       
        res.status(200).cookie('access_token', token, { httpOnly: true }).json(user);
    } catch (err) {
        next(err);
    }
}


//add user

const addUser = async (req, res, next) => {
    try {
        const user = req.body;
        const newUser = new User({...user, wallet: 0,bookings: [],personalDetails:{a:'1'}});
        const addedUser = await newUser.save();
        res.status(200).json(addedUser)
    }catch(err) {
        next(err);
    }
}

//edit user
const editUser = async (req, res, next) => {
    try {
        const user = req.body;
        const editedUser = await User.findByIdAndUpdate(user._id, user, {new: true});
        
        delete editedUser._doc.password
        res.status(200).json(editedUser);
    }catch(err) {
        next(err);
        
    }
}

//delete user
const deleteUser = async (req, res, next) => {
    try {
        const user = req.body;
        await User.findByIdAndDelete(user._id,{new: true});
        
        res.status(200).send("User has been deleted.");
    }catch(err) {
        next(err);
    }
}

module.exports = {addUser, editUser, deleteUser, loginUser};