//don't need the whole library only schema and model function
const { Schema, model} = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        //if no input is put the date.now function will execute and provide timestamp
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    //empty bracket indicate array as data type
    toppings:[]
});

//create the pizza model using the pizzaSchema
const pizza = model('Pizza', PizzaSchema);

//export the pizza model
module.exports = Pizza;