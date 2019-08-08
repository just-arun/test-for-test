const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    uname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    },
    level: {
        type: Number,
        require: true
    },
    image: String
});


const Auth = module.exports = mongoose.model("Auth", AuthSchema);
