const express = require('express');
const router = express.Router();               //sub package the express package ships with that gives us different capabalities to handle differnet routes reaching different endpoints, different http verbs

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /products.'
    })
})            //get is a method that will handle all the get request the 1st argument is the URL 

router.post('/',(req,res,next)=>{
    const product = {          //we create a new javascript object as products
        //and we want to get that name from the incoming request 
        name: req.body.name,
        price : req.body.price
    }
    res.status(201).json({
        message: 'Handling POST requests to /products.',
        createdProduct : product
    })
})

router.get('/:productId',(req,res,next)=>{                 //focus on the URL of how we are using : to get a variable in express
    const id = req.params.productId;
    if(id==='special'){
        res.status(200).json({
            message: ' You discovered the special ID',
            id:id
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
})

router.patch('/:productId',(req,res,next)=>{                 //focus on the URL of how we are using : to get a variable 
    res.status(200).json({
        message: 'updated Product'                      //Notice that we don't put return after the code because we are not putting any code after that and if there is code after that then we need to return the following
    })
})

router.delete('/:productId',(req,res,next)=>{                 //focus on the URL of how we are using : to get a variable 
    res.status(200).json({
        message: 'Deleted Product'
    })
})

module.exports = router;