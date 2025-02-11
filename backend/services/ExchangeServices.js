const exchangeRepository = require('../repositories/exchange')
const ExchangeHistory = require('../models/Exchange')
const User = require("../models/User");
const {BadRequestError} = require('../utils/errors');


exports.getCurrencies = async () => {
    const list = await exchangeRepository.getCurrencies();
    return list
}

exports.getItems = async (email) => {
    /* Instruction just for authenticated users */
    /* Uncomment below section if you want save this history just for authenticated users */
    // const user = await User.findOne({ email });
    // if (!user) {
    //     throw new NotFoundError('Account not found');
    // }
    // const list = await ExchangeHistory.find({
    //     userId: user._id,
    // }).sort({ timestamp: -1 });
    const list = await ExchangeHistory.find().sort({timestamp: -1}); // remove this line when you uncomment above section
    return list
}

exports.getItem = async (email, id) => {
    /* Instruction just for authenticated users */
    /* Uncomment below section if you want save this history just for authenticated users */
    // const user = await User.findOne({ email });
    // if (!user) {
    //     throw new NotFoundError('Account not found');
    // }
    // const item = await ExchangeHistory.find({
    //     userId: user._id
    // }).findById(id);
    const item = await ExchangeHistory.findById(id); // remove this line when you uncomment above section
    return item;
}

exports.saveItem = async (email, {from, to, amount}) => {
    if (!from || !to || !amount) {
        return new BadRequestError(`Please provide these fields: from, to, amount`);
    }

    const conversionRate = await exchangeRepository.getConversionRate(from, to);
    const convertedAmount = amount * conversionRate;
    const exchangeHistory = new ExchangeHistory({
        from,
        to,
        amount,
        conversionRate,
        convertedAmount,
    });

    /* Instruction just for authenticated users */
    /* Uncomment below section if you want save this history just for authenticated users */
    // const user = await User.findOne({email});
    // if (user) {
    //     exchangeHistory.userId = user._id;
    //     await exchangeHistory.save();
    // }
    await exchangeHistory.save(); // remove this line when you uncomment above section

    return exchangeHistory;
}
