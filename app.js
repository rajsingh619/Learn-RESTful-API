const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect("mongodb+srv://rajsingh:Rajsingh123@node-shop.chforur.mongodb.net/?retryWrites=true&w=majority&appName=node-shop")

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Handling the CORS error before sending any response 
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')  // adjusts the response with these headers
    //the other parameter * gives access to all the URLs and it can be specific to some URLs also
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type, Accept,Authorization')  //It defines which header must be sent along with the request
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({});
    }
    //method is the property which gives access to the HTTP request used on the request
    //Browser will always send an options request first when we send a POST req /PUT req
    //here the browser sees that if he can make the request
    //header says to the browser what he may sent and set to all the HTTP verbs
    // and then a response is sent back to the browser 
    next();
})

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
// 404 error says that we did not found a fitting route 

//Error handling can be implemented by catching all the requests that get pass through the above middlewares

app.use((error,req,res,next)=>{     //this will handle errors through anywhere in the application 
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})

module.exports = app;