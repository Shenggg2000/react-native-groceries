const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get(user){
  const rows = await db.query(
    `SELECT * 
    FROM cart_items
    LEFT JOIN products ON cart_items.product_id = products.id WHERE cart_items.user_id = ${user.id}`
  );
  const data = helper.emptyOrRows(rows);

  return data;
}

async function add(user, input){
  const result = await db.query(
    `INSERT INTO cart_items 
    (user_id, product_id, quantity) 
    VALUES 
    (${user.id}, ${input.product_id}, ${input.quantity})`
  );

  let message = 'Error in add product to cart';

  if (result.affectedRows) {
    message = 'add product to cart successfully';
  }

  return {message};
}

async function edit(user, input){
  const result = await db.query(
    `UPDATE cart_items 
    SET quantity=${input.quantity}
    WHERE user_id=${user.id} AND product_id=${input.product_id}`
  );
  let message = 'Error in update product quantity in cart';

  if (result.affectedRows) {
    message = 'updated product quantity in cart successfully';
  }

  return {message};
}

async function remove(user, input){
  const result = await db.query(
    `DELETE FROM cart_items 
    WHERE user_id=${user.id} AND product_id=${input.product_id}`
  );

  let message = 'Error in delete product in cart';

  if (result.affectedRows) {
    message = 'delete product in cart successfully';
  }

  return {message};
}

module.exports = {
  get, add, edit, remove
}