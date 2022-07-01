const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user');
const userAuth = require('./routes/userAuth');
const ownerAuthRoute = require('./routes/ownerAuth');
const ownerRoute = require('./routes/owner');
const { getCar } = require('./controllers/car');
const app = express();

app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use('/user', userRoute);
app.use('/userAuth', userAuth);
app.use('/ownerAuth', ownerAuthRoute);
app.use('/owner', ownerRoute)

app.post('/getCar', getCar)
const connect =  async () => {
    try {
        await mongoose.connect(process.env.MONGO,{autoIndex:true});
        console.log('Connected to MongoDB');
    }catch(err) {
        console.log(err);
    }
}

//middleware for last next(err)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });






app.listen(5000,()=>{
    connect();
    console.log('Server is running on port 5000')
    })