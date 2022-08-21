const db = require('./db');
const helper = require('../helper');

async function getAllCat(){
  const rows = await db.query(
    `SELECT *
    FROM product_categories`
  );
  const data = helper.emptyOrRows(rows);

  return data;
}

module.exports = {
  getAllCat
}