const mongoose = require('mongoose');

//code to set up a schema for
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,    //generates a unique combination 
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    //ref contains the name of the model we want to connect our order model to 
    quantity: {type: Number , default : 1}
    //defualt quantity will be 1 if no other quantity is passed in the body 
});

module.exports = mongoose.model('Order',orderSchema);

//convention is to use P capital in the name of model and we pass the schema along with it