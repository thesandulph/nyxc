const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const ExchangeController = require('../controllers/exchangeController')

router.get('/currency', ExchangeController.getCurrencies);
router.get('/convert', ExchangeController.getItems);
router.get('/convert/:id', ExchangeController.getItem);
router.post('/convert', ExchangeController.saveItem);

module.exports = router;