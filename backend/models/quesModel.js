const mongoose = require("mongoose")

const quesSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default:0
    },
    text:{
        type:String
    }
})

module.exports = mongoose.model("question", quesSchema)