const mongoose = require("mongoose");
const keys = require("./keys");
const db = mongoose.connect(keys.dbKEY,{useNewUrlParser:true});
module.exports = db;