const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(req) {
  let rows;
  if (req.query.cat) {
    rows = await db.query(
      `SELECT *
      FROM products WHERE product_category_id = ${req.query.cat}`
    );
  } else {
    rows = await db.query(
      `SELECT *
      FROM products`
    );
  }

  const data = helper.emptyOrRows(rows);

  return {
    data,
  }
}

async function get(id) {
  const rows = await db.query(
    `SELECT *
    FROM products WHERE id = ${id} LIMIT 1`
  );
  const data = helper.emptyOrRows(rows);

  return data[0];
}

module.exports = {
  getMultiple,
  get,
}