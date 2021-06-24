const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    job: {
        type: String,
        required: true
    }
})

module.exports = Mongoose.model('userModel', userSchema, "users")