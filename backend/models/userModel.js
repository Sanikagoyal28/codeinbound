const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    is_completed: {
        type: Boolean
    }
})

module.exports = mongoose.model("user", userSchema)