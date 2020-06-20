const mongoose = require("mongoose")
const momment =require('moment')
const comment = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    post:{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true },
    content:{type: String, required: true},
    date:{ type: Date, default: Date.now },
})

module.exports = mongoose.model("Comment", comment)
