const express = require('express');
const router = express.Router();               //sub package the express package ships with that gives us different capabalities to handle differnet routes reaching different endpoints, different http verbs

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'orders were fetched'
    })
})

router.post('/',(req,res,next)=>{
    res.status(201).json({          //status code 201 tells that everything was succesful and the order was created
        message: 'orders was created'
    })
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