const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const users = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    pass:String,
    about:String,
    date:{type:Date,default:Date.now}
})
users.pre('save', function(next) {
    let user = this;
    if (!user.isModified('pass')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.pass, salt, function(err, hash) {
            if (err) return next(err);
            user.pass = hash;
            next();
        });
    });
});

users.methods.comparePassword = function(pass,candidatePassword, cb) {

    bcrypt.compare(candidatePassword, pass, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("Users", users)
