const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
var PORT = 5000;



const app = express();


require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;


mongoose.connect(db,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: 'secret', 
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());



  app.use(flash());


  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

console.log();
app.listen(process.env.PORT || 5000);