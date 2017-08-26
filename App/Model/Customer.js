var mongoose = require('mongoose');  
var customerSchema = new mongoose.Schema({
	AccountId:String,
	Name: String,
	Address: String,
	EmailId: {
		type: String,
		index: true
	},
	dob: String,
	city: String,
	state:String,
	Password: String,
	userName :String,
	priviledge:String,
	customerId :String,
	updated_at: { type: Date, default: Date.now }
});
var Customers = mongoose.model('Customers', customerSchema);
module.exports = Customers;
