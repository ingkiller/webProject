const createError = require('http-errors');
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser  = require("body-parser")
const mongoose = require('mongoose');
var authCtrl = require('./controllers/auth');
var middleware = require('./controllers/middleware');
// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./models/Users');
var router = express.Router();

router.post('/auth/signup', authCtrl.emailSignup);
router.post('/auth/login', authCtrl.emailLogin);

mongoose.connect("mongodb://localhost:27017/webApp", { useNewUrlParser: true,useUnifiedTopology: true ,user: 'admin', pass: 'admin'})
    .then(() =>  console.log('connection successful'))
    .catch((err) => console.error(err));

app.use(router)

const routerPost = require('./controllers/post')
app.use('/post',routerPost)
const routerUser=require('./controllers/user')
app.use('/user',routerUser)


//protect private routes
/*
app.use(middleware.ensureAuthenticated, function(req, res) {
 if(req.isAuthenticated){
        next()
    }else
    {
        res.redirect('/login')
    }
} )
 */

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
