const mongoose = require('mongoose');
const Users = require('../models/Users')
const service = require('./service');

exports.emailSignup = function(req, res) {
    const {name,email,pass,about}=req.body

    Users.findOne({email:email.toLowerCase()},(err,user,next)=>{
        if(err)
            next(err)
        if(user !== null){
            return res.status(422).send()
        }else {
            const user = new Users({name,email:email.toLowerCase(), pass,about})
            user.save((err)=>{
                if(err){
                    return res.status(500).send()
                }else{
                    let _user = user._doc
                    delete _user.pass
                    delete _user.about
                    delete _user.date
                    return res.status(200).send({_user,token: service.createToken({_id:user._id,name:user.name,email:user.email,about:user.about})});
                }

            })
        }
    })

};

exports.emailLogin = function(req, res) {
    const {email,pass}=req.body

    Users.findOne({email: email}, (err, user,next)=> {

        if(err){
            next(err)
        }
        if(user === null){
            return res.status(422).send()
        }else {
            user.comparePassword(user.pass, pass,function(err, isMatch) {
                if (err || !isMatch) {
                    return res.status(422).send()
                }else {
                    let _user = user._doc
                    delete _user.pass
                    delete _user.about
                    delete _user.date
                    return res.status(200).send({_user,token: service.createToken(user)});
                }

            });
        }
    })
};
