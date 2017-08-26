var request = require('request');
var express = require('express');
var mongoose = require('mongoose');
var customerModel = require('./App/Model/Customer.js');
var benifiaryModel = require('./App/Model/Benificiary.js');

var config = require('./config.js');
var localAccountId;
module.exports = function (app) {
	let remoteServerIP = config.server.ipAddr;
	let remoteServerPORT = config.server.port;
	
	/*----------  Landing Home Page  ----------*/

	app.use('/', express.static(__dirname + '/', {
		maxAge: '1h'
	}));

	app.get('/loginPage', function (req, res, next) {
		res.sendFile('index.html', {
			root: __dirname + '/'
		});
	});
	/*----------  Logins Direct  ----------*/

	app.post('/validUser', function (req, res, next) {
		request.get({
			url: "http://localhost:8080/UserAccountAPI/webapi/users/" + req.body.username + "/" + req.body.password
		}, function (error, response, body) {
			if (error) console.log('Authorization failed');
			return res.send(JSON.parse(body));
		});


	});
	/*----------  Deposit Money to Account  ----------*/

	app.post('/depositMoney', function (req, res, next) {
		request.get({
			url: "http://localhost:8080/UserAccountAPI/webapi/users/bkurmi/password"
		}, function (error, response, body) {
			if (error) console.log('Authorization failed');
			return res.send(JSON.parse(body));
		});


	});
	/*----------  End  ----------*/

	/*----------  Get first 10 Transactions to Account  ----------*/

	app.post('/getTransactionsByAccountId', function (req, res, next) {
		
		request.get({
			url: "http://localhost:8080/UserAccountAPI/webapi/users/transactions/"+req.body.accountId
		}, function (error, response, body) {
			if (error) console.log('Authorization failed');
			return res.send(JSON.parse(body));
		});


	});
	/*----------  End  ----------*/

	/*----------  Personal Details  ----------*/

	app.post('/userDetails', function (req, res, next) {
		request.get({
			url: "http://localhost:8080/UserAccountAPI/webapi/users/" + req.body.username + "/" + req.body.password
		}, function (error, response, body) {
			if (error) console.log('Authorization failed');
			return res.send(JSON.parse(body));
		});


	});
	/*----------  End  ----------*/


	/*----------  Account Details  ----------*/

	app.post('/accountDetails', function (req, res, next) {
		request.get({
			url: req.body.accountDetailLnk
		}, function (error, response, body) {
			if (error) console.log('Authorization failed');
			return res.send(JSON.parse(body));
		});


	});
	/*----------  End  ----------*/

	/*----------  Add Benificiary  ----------*/
	app.post('/addBenificiary', function (req, res, next) {
		var benificiary = mongoose.model('Benificiaries');
		var newBenificiary = new benificiary({
			CustomerAccountNo: req.body.accountId,
			BenificiaryAccountNo: req.body.benificiaryObj.benificiaryAccountNo,
			ConfirmBenificiaryAccountNo: req.body.benificiaryObj.reEnterBenificiaryAccountNo,
			AccountType: req.body.benificiaryObj.benificiaryAccountType,
			IFSCCode: req.body.benificiaryObj.ifsc,
			BenificiaryName: req.body.benificiaryObj.benificiaryName,
			EmailId: req.body.benificiaryObj.emailId
		})
		newBenificiary.save(function (err, benificiary) {
			if (err) throw err;
			res.send("The Benificiary is Successfully created");
		});

	});
	/*----------  End  ----------*/

	/*----------  All Benificiary  ----------*/
	app.post('/getAllBenificiaryByAccountId', function (req, res, body) {
		// get all the users
		localAccountId = req.body.accountId;
		var benificiary = mongoose.model('Benificiaries');
		benificiary.find({ 'CustomerAccountNo': req.body.accountId}, function (err, result) {
			if (err) return handleError(err);
			return res.send(result);
		})

	})
	/*---------------End r-------------*/

	 
	app.post('/processFundTransferRequest', function (req, res, next) {
		console.log(req.body.fundTransferObjValues.fromAccount);
		request.post({
			url: "http://localhost:8080/UserAccountAPI/webapi/users/accounts/" 
			+ req.body.fundTransferObjValues.fromAccount 
			+"/"+req.body.fundTransferObjValues.payeeAccountId
			+ "/fundTransfer/" 
			+ req.body.fundTransferObjValues.amount
			+ "/" + req.body.fundTransferObjValues.remarks 			
		}, function (error, response, body) {
			if (error) console.log('Authorization failed')
			 res.send(JSON.parse(body));
		});
	});

	app.post('/addCustomer', function (req, res, next) {
		request.post({
			url: "http://localhost:8080/UserAccountAPI/webapi/users/addtestdata",
     		headers: {
				"Content-Type": "application/json",
				"Accept" : "application/json"
     		},
			body: {
			"name":req.body.customrObj.name,
			"address":req.body.customrObj.address,
			"dob":req.body.customrObj.dob,
			"city":req.body.customrObj.city,
			"state":req.body.customrObj.state,
			"userName" :req.body.customrObj.userName,
			"password": req.body.customrObj.password,
			"emailId" :req.body.customrObj.EmailId
			},
     		json:true
		}, function (error, response, body) {
			if (error) console.log('Authorization failed');
			req.body = response.body;
			next();
			 //res.send(JSON.parse(body));
		});
	});


	app.post('/addCustomer', function (req, res, next) {
		var customer = mongoose.model('Customers');
		var newCustomer = new customer({
			AccountId: req.body.accountId,
			Name : req.body.name,
			Address: req.body.address,
			EmailId: req.body.emailId,
			dob: req.body.dob,
			city: req.body.city,
			state: req.body.state,
			userName :req.body.userName,
			priviledge:req.body.priviledge,
			customerId :req.body.customerId,
			Password: req.body.password
		})
		newCustomer.save(function (err, benificiary) {
			if (err) throw err;
			res.send("The Customer is Successfully created");
		});

	});

	app.post('/removeBenificiary', function (req, res,next) {
		// Delete benificiery
		var benificiary = mongoose.model('Benificiaries');
		benificiary.remove({ 'BenificiaryAccountNo': req.body.bAccountNo }, function (err) {
			if (err) throw err;
			next();
		});
	});

	app.post('/removeBenificiary', function (req, res,next) {
		// get all the users after removing benificiary
		var benificiary = mongoose.model('Benificiaries');
		benificiary.find({ 'CustomerAccountNo': localAccountId}, function (err, result) {
			if (err) return handleError(err);
			return res.send(result);
		})
	})

};
