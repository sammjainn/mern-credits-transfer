const express = require('express');
const router = express.Router();

//user model
const transactions = require('../../models/transactions');

router.get('/', (req, res) => {
  transactions
    .find()
    .sort({ date: -1 })
    .then((transaction) => res.json(transaction));
});

module.exports = router;
