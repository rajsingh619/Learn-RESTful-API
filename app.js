const express = require('express');
const app = express();

const morgan = require('morgan');



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));``

app.use('/products',productRoutes);
app.use('/orders',orderRoutes)
//this is a middleware where every request is funneled through , 1st parameter is filter , so the only requests that start with this will then be handled by the handler we pass as the second argument...here productRoutes.

// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'IT works'
//     });
// })            //It sets up a middleware an incoming request has to go through the app.use and to whatever we pass to it --> it can be simply be a function 
app.use((req,res,next)=>{    //everything that comes after the abover routes will be handled in this
     const error = new Error('Not found');
     error.status = 404;
     next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})

module.exports = app;