const express = require('express');
const router = express.Router();
const productcategories = require('../services/productcategories');

/* GET product by cat*/
router.get('/', async function(req, res, next) {
  try {
    res.json(await productcategories.getAllCat());
  } catch (err) {
    console.error(`Error while getting product`, err.message);
  }
});

module.exports = router;