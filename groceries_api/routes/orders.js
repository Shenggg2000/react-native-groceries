const express = require('express');
const router = express.Router();
const orders = require('../services/orders');
const helper = require('../helper');

/* GET get cart item. */
router.get('/', helper.authenticateToken, async function(req, res, next) {
  try {
    res.json(await orders.get(req.user));
  } catch (err) {
    console.error(`Error while getting cart items `, err.message);
    next(err);
  }
});

/* POST add cart item. */
router.post('/add', helper.authenticateToken, async function(req, res, next) {
  try {
    res.json(await orders.add(req.user, req.body));
  } catch (err) {
    console.error(`Error while getting cart items `, err.message);
    next(err);
  }
});

/* POST edit cart item. */
router.post('/edit', helper.authenticateToken, async function(req, res, next) {
  try {
    console.log(req);
    res.json(await orders.edit(req.user, req.body));
  } catch (err) {
    console.error(`Error while edit cart items `, err.message);
    next(err);
  }
});

/* POST remove cart item. */
router.post('/delete', helper.authenticateToken, async function(req, res, next) {
  try {
    res.json(await orders.remove(req.user, req.body));
  } catch (err) {
    console.error(`Error while remove cart items `, err.message);
    next(err);
  }
});

module.exports = router;