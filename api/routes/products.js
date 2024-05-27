const express = require('express');
const router = express.Router();               //sub package the express package ships with that gives us different capabalities to handle differnet routes reaching different endpoints, different http verbs

const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/',(req,res,next)=>{
   /* res.status(200).json({
        message: 'Handling GET requests to /products.'
    })*/
    Product.find()
    .select('name price _id')           //defines which fields we want to select
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            products: docs.map(doc=>{
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/products/'+doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})            //get is a method that will handle all the get request the 1st argument is the URL 

router.post('/',(req,res,next)=>{
    // const product = {          //we create a new javascript object as products
    //     //and we want to get that name from the incoming request 
    //     name: req.body.name,
    //     price : req.body.price
    // }
    
    //Product created with the help of mongoose
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        price: req.body.price
    })
    product.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Created Product successfully',
            createdProduct : result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
});
    //save will then store in the database , function provided by mongoose
   
})

router.get('/:productId',(req,res,next)=>{                 //focus on the URL of how we are using : to get a variable in express
    const id = req.params.productId;
    // if(id==='special'){
    //     res.status(200).json({
    //         message: ' You discovered the special ID',
    //         id:id
    //     })
    // } else {
    //     res.status(200).json({
    //         message: 'You passed an ID'
    //     });
    // }
    Product.findById(id).exec().then(doc=>{
        console.log(doc);
        if(doc){
        res.status(200).json(doc);
        }
        else{
            res.status(404).json({
                message:"No product found "
            })
        }    //since promises are run asynchronously we are sending a response in the then block
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    });
})

router.patch('/:productId',(req,res,next)=>{                 //focus on the URL of how we are using : to get a variable 
   /* res.status(200).json({
        message: 'updated Product'                      //Notice that we don't put return after the code because we are not putting any code after that and if there is code after that then we need to return the following
    })*/
    const id = req.params.productId;
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.delete('/:productId',(req,res,next)=>{                 //focus on the URL of how we are using : to get a variable 
   /* res.status(200).json({
        message: 'Deleted Product'
    })*/
    const id = req.params.productId;
    Product.deleteOne({
        _id: id
    }).exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;