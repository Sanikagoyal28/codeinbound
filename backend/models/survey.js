const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const surveySchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'user'
    },
    question: {
        type: ObjectId,
        ref: 'question'
    },
    ans_rating: {
        type: Number
    },

    ans_text: {
        type: String
    }
})

module.exports = mongoose.model("survey", surveySchema)