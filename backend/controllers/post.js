const express = require('express');
const jwt = require('jwt-simple');
const router = express.Router();
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Users =require('../models/Users')
const config = require('./config');
const moment = require('moment')

router.post("/addPost", (req,res,next)=>{
     try {
          if(!req.headers.authorization) {
               return res.status(403).send('not header');
          }
          const token = req.headers.authorization.split(" ")[1];

          const payload = jwt.decode(token, config.TOKEN_SECRET);

               if(payload.exp <= moment().unix()) {

                     res.status(401).send({message: "El token ha expirado"});
               }
           const {title,content,category}=req.body
          const _post = new Post({user:payload.userId,title,content,category})
          _post.save((err)=>{
               if(err)
                    res.status(400).send()


               res.status(200).send(_post)
          })


     }catch (e) {
          console.log('Error:',e)
          return  res.status(405).send({error:true,errorCode:405,desc:'Method not allowed'})
     }
})

router.post('/post-pagin',async (req,res,next)=>{
     try{
          const {indexStart=0,nElem=10,orderField='date',order=-1}=req.body
          const result = await Post.find().skip(indexStart*nElem).limit(nElem).sort({[orderField]:order})
          if(result.length > 0){
               const final = []
               let com;
               let  _user;
               for(let i=0;i < result.length;i++){
                    _user = await Users.findOne({_id:result[i].user}).select("_id name email")

                    if(_user === null)
                         return res.status(422).send()

                    com = result[i]
                    let count = await  Comment.aggregate([{
                         $match: {post:com._id}
                    }
                         , {$group:
                                  {_id: '$user', total: {$sum: 1} }
                         }])
                    if(count.length > 0)
                         com.commentCount = count[0].total
                    else
                         com.commentCount = 0
                    com.user = _user

                    final.push(com)
               }
               return res.status(200).send(final)
          }
          res.status(200).send(result)

     }catch (e) {
          res.status(500).send()
     }
})

router.post('/comment/add',async (req,res,next)=>{

     try{
          if(!req.headers.authorization) {
               return res.status(403).send('not header');
          }
          const token = req.headers.authorization.split(" ")[1];

          const payload = jwt.decode(token, config.TOKEN_SECRET);

          if(payload.exp <= moment().unix()) {
               res.status(401).send({message: "El token ha expirado"});
          }

          const {postId,content}=req.body

          const _comment = new Comment({user:payload.userId,post:postId,content})
          _comment.save((err)=>{
               if(err) {
                    res.status(400).send()
               }
               res.status(200).send(_comment)
          })

     }catch (e) {

          res.status(500).send()
     }


})

router.post('/comment/get-by-post',async (req,res,next)=>{
     try{
          const{postId}=req.body
          console.log('postId:',postId)
          Comment.find({post:postId},async (err,result)=>{
               if(err){
                    res.status(400).send()
               }
               if(result.length > 0){
                    const _user = await Users.findOne({_id:result[0].user}).select("_id name")
                    const  final = [...result].map(com=>{
                         com.user = _user
                         return com
                    })
                    res.status(200).send(final)
               }
               res.status(200).send(result)

          }).sort({date:-1})

     }catch (e) {

          res.status(500).send()
     }


})

router.get('/stats',async (req,res,next)=>{

     try{
          Post.aggregate([
               {
                    $match: {}
               }
               , {$group:
                        {_id: '$category', total: {$sum: 1} }
               }],(err,docs)=>{
               console.log('err:',err)
               console.log('docs:',docs)
               return res.status(200).send(docs)
          })

     }catch (e) {

          res.status(500).send()
     }


})

router.post('/paginator',async (req,res,next)=>{

     try{
          const {nElem}=req.body
          Post.aggregate([
               {$match: {}}
               , {$group:
                        {_id: '$id', total: {$sum: 1} }
               }],(err,docs)=>{
               if(err)
                    return res.status(500).send()
               if(docs.length > 0){
                    let total =docs[0].total
                    let pages = 0
                    if(total <=nElem)
                         pages = 1
                    else{
                         let rest = total % nElem
                         pages = Math.floor(total/nElem)
                         pages= rest === 0?pages:(pages+1)
                    }
                    return res.status(200).send({nElem:nElem,pages: pages,total:total})
               }
               return res.status(200).send({nElem:nElem,pages:0,total:0})
          })
     }catch (e) {
          return res.status(500).send()
     }


})

router.post('/filter-paginator',async (req,res,next)=>{
     try{
          const {nElem,filter}=req.body
          Post.aggregate([
               {$match: {title:{$regex:filter,'$options' : 'i'}}}
               , {$group:
                        {_id: '$id', total: {$sum: 1} }
               }],(err,docs)=>{
               if(err)
                    return res.status(500).send()
               if(docs.length > 0){
                    let total =docs[0].total
                    let pages = 0
                    if(total <=nElem)
                         pages = 1
                    else{
                         let rest = total % nElem
                         pages = Math.floor(total/nElem)
                         pages= rest === 0?pages:(pages+1)
                    }
                    return res.status(200).send({nElem:nElem,pages: pages,total:total})
               }
               return res.status(200).send({nElem:nElem,pages:0,total:0})
          })
     }catch (e) {
          return res.status(500).send()
     }


})

router.post('/filter',async (req,res,next)=>{

     try{
          const {indexStart=0,nElem=10,orderField='date',order=-1,filter}=req.body
          let result = await Post.find({title:{$regex:filter,'$options' : 'i'}}).populate('user','-pass')
              .skip(indexStart*nElem).limit(nElem).sort({[orderField]:order})
          if(result.length > 0){
               const final = []
               let post
               for(let i=0;i < result.length;i++){

                    post = result[i]
                    let count = await  Comment.aggregate([{
                         $match: {post:post._id}
                    }
                         , {$group:
                                  {_id: '$post', total: {$sum: 1} }
                         }])
                    if(count.length > 0)
                         post.commentCount = count[0].total
                    else
                         post.commentCount = 0
                    final.push(post)
               }

               return res.status(200).send(final)
          }

          return res.status(200).send(result)

     }catch (e) {
          return res.status(500).send()
     }
})

module.exports = router
