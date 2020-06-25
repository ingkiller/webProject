const express = require('express');
const jwt = require('jwt-simple');
const router = express.Router();
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Users =require('../models/Users')
const config = require('./config');
const moment = require('moment')
const service = require('./service');
const bcrypt = require("bcrypt")

router.post('/info',async (req,res,next)=>{

    try {
        const {userId}=req.body
        let result = await Users.findOne({_id:userId},{name:1,email:1,about:1,about:1,date:1})
        if(result !== null){

            Post.aggregate([
                {
                    $match: {user:result._id}
                }
                , {$group:
                        {_id: '$user', total: {$sum: 1} }
                }],(err,docs)=>{
                let count = 0
                if(docs.length > 0){
                    count = docs[0].total
                }
                let obj =result._doc
                let r = {...obj,countPost:count}
                return res.status(200).send(r)
            })
        }else {
           return  res.status(200).send()
        }

    }catch (e) {
        next(e)
         return res.status(500).send
    }

})
router.get('/update',async (req,res,next)=>{
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash('1234567', salt, async (err, hash) =>{
            if (err) return next(err);

                return res.status(200).send(hash);


        });
    });
})
router.post('/update-profile',async (req,res,next)=>{

    try{
        if(!req.headers.authorization) {
            return res.status(403).send('not header');
        }
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.decode(token, config.TOKEN_SECRET)
        if(payload.exp <= moment().unix()) {
            res.status(401).send({message: "expired"});
        }
        const{name,about}=req.body

        let result = await Users.updateOne({_id: payload.userId},{$set:{name:name,about:about}})
        if(result.ok === 1){
            let _user = await Users.findOne({_id: payload.userId}).select("name email")
            let user = _user._doc
            return res.status(200).send({user,token: service.createToken(user)});
        }
        return res.status(422).send()
    }catch (e) {
        return res.status(500).send()
    }
})
router.post('/change-pass',async (req,res,next)=>{

    try{
        if(!req.headers.authorization) {
        return res.status(403).send('not header');
    }
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.decode(token, config.TOKEN_SECRET);
        if(payload.exp <= moment().unix()) {
            res.status(401).send({message: "expired"});
        }
        const{oldPass,newPass}=req.body
        Users.findOne({_id:payload.userId}, (err, _user,next)=> {
            if(err){
                next(err)
            }
            if(_user === null){
                return res.status(422).send()
            }else {
                _user.comparePassword(_user.pass, oldPass,async (err, isMatch) =>{
                    if (err || !isMatch) {
                        return res.status(422).send()
                    }else {
                        bcrypt.genSalt(10, function(err, salt) {
                            if (err) return next(err);
                            bcrypt.hash(newPass, salt, async (err, hash) =>{
                                if (err) return next(err);
                                let result = await Users.updateOne({_id: payload.userId},{$set:{pass:hash}})
                                if(result.ok === 1){
                                    return res.status(200).send({success:true});
                                }else {
                                    return res.status(422).send();
                                }

                            })
                        })
                    }
                })
            }
        })

    }catch (e) {
        return res.status(500).send()
    }
})
module.exports = router
