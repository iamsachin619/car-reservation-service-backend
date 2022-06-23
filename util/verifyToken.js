const jwt = require("jsonwebtoken");
const { createError } = require("../util/createError");

const User = require("../models/user");
const Owner = require("../models/owner");
const verifyToken = (req, res, next) => {
  
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "No token provided!"));
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(createError(401, "Invalid token!"));
    req._id = decoded.id;
    req.type = decoded.type;
   
    next();
    
  });
  // req.owner_id = decoded.id;
  //  console.log('vot end')
  // next();
  // console.log('vot d end')
  return;
};
const verifyOwner = async (req, res, next) => {

  
    if(req.type !== 'Owner') return next(createError(401, "Not an owner!"));

    if (req._id === req.body._id) return next();

    return next(createError(401, "Unauthorized!"));

};



const verifyAdmin = async (req, res, next) => {

  
  if(req.type !== 'Admin') return next(createError(401, "Not an Admin!"));

  if (req._id === req.body._id) return next();

  return next(createError(401, "Unauthorized!"));

};

const verifyUser = async (req, res, next) => {
  if(req.type !== 'User') return next(createError(401, "Not an User!"));

  if (req._id === req.body._id) return next();

  return next(createError(401, "Unauthorized!"));

}



// const verifyTokenAdmin = (req, res, next) => {
//   console.log("in verifyAdmin Token");
//   const token = req.cookies.access_token;
//   if (!token) return next(createError(401, "No token provided!"));
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return next(createError(401, "Invalid token!"));
//     req.admin_id = decoded.id;
//     next();
//   });

//   const verifyAdmin = (req, res, next) =>{
//     if((req.admin_id=== req.body._id)){
//       return next()
//     }
//     return next(createError(401, 'Unauthorized!'))
//   }


module.exports = {
  verifyToken,
  verifyAdmin,
  verifyOwner,
  verifyUser
  

};
