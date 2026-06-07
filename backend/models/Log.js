const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({

    status:String,

    responseTime:Number,

    timestamp:Date

},{
    timestamps:true
});

module.exports =
mongoose.model("Log",logSchema);