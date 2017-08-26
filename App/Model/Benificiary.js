var mongoose = require('mongoose');  
var benificiarySchema = new mongoose.Schema({
	CustomerAccountNo:String,
	BenificiaryAccountNo: {
		type: String,
		index: true
	},
	ConfirmBenificiaryAccountNo: String,
	AccountType: String,
	IFSCCode: String,
	BenificiaryName: String,
	EmailId: String,
	updated_at: { type: Date, default: Date.now }
});
var Benificiaries = mongoose.model('Benificiaries', benificiarySchema);
module.exports = Benificiaries;