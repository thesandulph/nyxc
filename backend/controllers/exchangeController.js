const ExchangeServices = require('../services/ExchangeServices')

exports.getCurrencies = async (req, res) => {
    const items = await ExchangeServices.getCurrencies()
	res.status(200).json(items)
}

exports.getItems = async (req, res) => {
    const items = await ExchangeServices.getItems(req.email)
	res.status(200).json(items)
}

exports.getItem = async (req, res) => {
    const item = await ExchangeServices.getItem(req.email, req.params.id)
	res.status(200).json(item)
}

exports.saveItem = async (req, res) => {
    const item = await ExchangeServices.saveItem(req.email, req.body)
    res.status(200).json(item)
}
