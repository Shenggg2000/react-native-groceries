const express = require('express');
const router = express.Router();
const products = require('../services/products');

/* GET products. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await products.getMultiple(req));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

/* GET product */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await products.get(req.params.id));
  } catch (err) {
    console.error(`Error while getting product`, err.message);
    next(err);
  }
});

module.exports = router;