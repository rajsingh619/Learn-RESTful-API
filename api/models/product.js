const mongoose = require('mongoose');

//code to set up a schema for
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,    //generates a unique combination 
    name:{type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product',productSchema);

//convention is to use P capital in the name of model and we pass the schema along with it