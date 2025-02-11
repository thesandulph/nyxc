const mongoose = require('mongoose');

//------------ Item Schema ------------//
const ExchangeHistorySchema = new mongoose.Schema({
    userId: {type: String, default: null},
    from: {type: String, required: true},
    to: {type: String, required: true},
    amount: {type: Number, required: true},
    conversionRate: {type: Number, required: true},
    convertedAmount: {type: Number, required: true},
}, { versionKey: false, timestamps: true });

const ExchangeHistory = mongoose.model('Exchange', ExchangeHistorySchema);

module.exports = ExchangeHistory;