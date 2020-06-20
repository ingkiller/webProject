const mongoose = require("mongoose")
const moment = require('moment')
const post = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    title:{type: String, required: true},
    content:{type: String, required: true},
    category:{type: String, required: true, enum: ['Sport', 'Music', 'Art', 'Other'], default: 'Sport'},
    date:{ type: Date, default: Date.now },
    commentCount:{type:Number,default: 0},
})

module.exports = mongoose.model("Post", post)
