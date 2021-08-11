//don't need the whole library only schema and model function
const { Schema, model} = require('mongoose');
const Pizza = require('./Pizza');
const Comment = require('./Comment');
const dateFomrat = require('../utils/dateformat');

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
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    //empty bracket indicate array as data type
    toppings:[],

    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
    }, 
        {
    toJson: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

//get total cpunt of comment and replies on retrival
PizzaSchema.virtual('commentCount').get(function(){
    return this.comments.reduce((total, comment) => total + comment.replace.length + 1, 0);
});

//create the pizza model using the pizzaSchema
const pizza = model('Pizza', PizzaSchema);

//export the pizza model
module.exports = Pizza;
module.exports = Comment;