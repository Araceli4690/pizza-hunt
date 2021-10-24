//don't need the whole library only schema and model function
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            //if no input is put the date.now function will execute and provide timestamp
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },
        //empty bracket indicate array as data type
        toppings: [],

        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//get total cpunt of comment and replies on retrival
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.reduce(
        (total, comment) => total + comment.replies.length + 1,
        0
    );
});

//create the pizza model using the pizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the pizza model
module.exports = Pizza;
