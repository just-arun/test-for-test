const mongoose = require("mongoose");
const LogsSchema = mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    uid:{
        type: String,
        require: true
    },
    role: String,
    email: String,
    date: Date,
    leaves: Number,
    logs: Array
});


const Users = module.exports = mongoose.model("Users",LogsSchema);