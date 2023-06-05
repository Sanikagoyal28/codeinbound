const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean
    },
    answers: [{
        question: {
            type: ObjectId,
            ref: 'question'
        },
        rating: {
            type: Number
        },
        text:{
            type:String
        }
    }]
})

module.exports = mongoose.model("user", userSchema)