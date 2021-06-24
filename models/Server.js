const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        default: 'm!'
    },
    currencyexchange: {
        type: String,
        default: ''
    }
})

module.exports = Mongoose.model('serverModel', userSchema, "servers")