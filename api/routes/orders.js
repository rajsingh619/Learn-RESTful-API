const express = require('express');
const router = express.Router();               //sub package the express package ships with that gives us different capabalities to handle differnet routes reaching different endpoints, different http verbs

const mongoose = require('mongoose');
const Order = require('../models/order');
router.get('/',(req,res,next)=>{
    // res.status(200).json({
    //     message: 'orders were fetched'
    // })

    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs=>{
        res.status(201).json({
            count : docs.length,
            orders: docs.map(doc=>{
                return{
                    _id : doc._id,
                    product: doc.product,
                    quantity : doc.quantity,
                    request:{
                        type: 'GET',
                        url: "http://localhost:3000/orders/"+doc._id
                    }
                }
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

router.post('/',(req,res,next)=>{
    // const order = {
    //     productId : req.body.productId,
    //     quantity: req.body.quantity
    // }
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })

    order.save()
    .then(result =>{
      console.log(result);
      res.status(201).json({
        message: "order created successfully",
        createdOrder: {
            _id: result._id,
            product: result.product,
            quantity: result.quantity
        },
        request:{
            type: 'GET',
            url: "https://localhost:3000/orders"+result._id
        }
      })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    // res.status(201).json({          //status code 201 tells that everything was succesful and the order was created
    //     message: 'orders was created',
    //     order: order
    // })
})

router.get('/:orderId',(req,res,next)=>{      //Dynamic path paramter by using colon
    res.status(200).json({          //status code 201 tells that everything was succesful and the order was created
        message: 'Order Details',
        orderId : req.params.orderId
    })
})

router.delete('/:orderId',(req,res,next)=>{      //Dynamic path paramter by using colon
    res.status(200).json({          //status code 201 tells that everything was succesful and the order was created
        message: 'Order Deleted',
        orderId : req.params.orderId
    })
})

module.exports = router;