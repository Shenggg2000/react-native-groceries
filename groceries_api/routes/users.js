const express = require('express');
const router = express.Router();
const users = require('../services/users');
const helper = require('../helper');

router.post('/register', async (req, res) => {
  try {
    let result = await users.register(req.body);
    if (result != 'Error in creating user') {
      const token = helper.generateAccessToken({ id: result });
      res.json({token});
    }else{
      res.json({error: "Email has been used!"});
    }
  } catch (err) {
    console.error(`Error while register `, err.message);
    next(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    let result = await users.login(req.body);
    if (result != 'Not Found') {
      const token = helper.generateAccessToken({ id: result });
      res.json({token});
    }else{
      res.json({error: "Incorrect Email Password Pair!"});
    }
  } catch (err) {
    console.error(`Error while login `, err.message);
    next(err);
  }
});

/* PUT product */
router.post('/update', helper.authenticateToken, async function(req, res, next) {
  try {
    res.json({res: await users.update(req.body, req.user)});
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

/* GET products. */
router.get('/', helper.authenticateToken, async function(req, res, next) {
  try {
    res.json(await users.getUser(req.user));
  } catch (err) {
    console.error(`Error while getting profile `, err.message);
    next(err);
  }
});

module.exports = router;