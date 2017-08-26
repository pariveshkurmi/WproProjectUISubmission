var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
// Load mongoose package
var mongoose = require('mongoose');

var config = require('./config.js');
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost:27017/UserAccount');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//var userSchema = new mongoose.Schema();
	
//var uesr = mongoose.model('user1', userSchema);
var port = 3000;
var app = express();
var allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}
app.set('port', process.env.NODEJS_PORT || 3000);
app.set('ipaddr', process.env.NODEJS_IP || "127.0.0.1");
app.set('view options', { layout: false });
app.use(cookieParser());
app.use(bodyParser());
//app.use(expressSession({secret: config.consumer_key}));
app.use(express.static('./'));
app.use(allowCrossDomain);
//app.all('/OBP-API-1.0', checkAuth);
var customerModel = require('./App/Model/Customer.js');
var benifiaryModel = require('./App/Model/Benificiary.js');
//var benifiaryModel = require('./trial.js');
require('./routes.js')(app);
//app.use(redirectUnmatched);

app.listen(port);
console.log('Node listening on port %s', port);
