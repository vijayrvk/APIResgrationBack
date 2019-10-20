var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./server/routes/authRoutes');
const roles = require('./server/routes/rolesRoutes');
const users = require('./server/routes/userRoutes');
const project = require('./server/routes/projectRoutes');
const path = require('path');
var ba64 = require("ba64");
// Set up mongoose connection
const dev_db_url = 'mongodb://localhost:27017/postman';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
  useNewUrlParser: true
}, function (err) {
  if (!err) {
    console.log(`Db Connected`)
  }
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
const cors = require('cors')
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/auth', auth);
app.use('/roles', roles);
app.use('/user', users);
app.use('/project', project);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  if (err.error && err.error.isJoi) {
    // console.log(req.pa)
    // we had a joi error, let's return a custom 400 json response
    console.log((err.error.details[0]))
    let errorMsg = capitalizeFirstLetter(err.error.details[0].path[0]);
    if (err.error.details[0].type === 'any.required') {
      errorMsg = `${errorMsg} is Required`;
    } else if (err.error.details[0].type === 'string.email') {
      errorMsg = `${errorMsg} is not Valid Email ID`;
    } else if (err.error.details[0].type === 'object.base') {
      errorMsg = `${errorMsg} is should Object`;
    } else if (err.error.details[0].type === 'date.timestamp.javascript') {
      errorMsg = `${errorMsg} is not Valid Date`;
    } else if (err.error.details[0].type === 'number.base') {
      errorMsg = `${errorMsg} is not Valid Number`;
    } else if (err.error.details[0].type === 'array.base') {
      errorMsg = `${errorMsg} is not Valid Array`;
    } else {
      errorMsg = `${errorMsg} is not Valid. Please check`;
    }

    res.status(200).json({
      success: false,
      message: errorMsg
    });
  } else {
    console.log(err)
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    console.log(err)
    res.json({
      message: err.message,
      error: err
    });
  }

});



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

app.listen(3214, function () {
  console.log('port 3214 connected')
})

module.exports = app;