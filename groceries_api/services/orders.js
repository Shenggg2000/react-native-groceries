const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get(user) {
  const rows = await db.query(
    `SELECT * 
    FROM orders
    WHERE orders.user_id = ${user.id}`
  );
  const orders = helper.emptyOrRows(rows);

  for (let order of orders) {
    const rows = await db.query(
      `SELECT * 
      FROM product_order
      LEFT JOIN products ON product_order.product_id = products.id 
      WHERE product_order.order_id = ${order.id}`
    );
    order.products = rows;
  }

  return orders;
}

async function add(user, input) {
  const result = await db.query(
    `INSERT INTO orders 
    (user_id, amount, delivery_address, payment_method, created_at, isCancel) 
    VALUES 
    (${user.id}, ${input.amount}, "${input.delivery_address}", "${input.payment_method}", NOW(), FALSE)`
  );

  let message = 'Error in create order';

  if (result.affectedRows) {
    for (let p of input.products) {
      let result2 = await db.query(
        `INSERT INTO product_order 
        (product_id, order_id, quantity) 
        VALUES 
        (${p.product_id}, ${result.insertId}, ${p.quantity})`
      );
    }
    message = 'create order successfully';
  }

  if (message == "create order successfully") {
    const result = await db.query(
      `DELETE FROM cart_items 
      WHERE user_id=${user.id}`
    );
  }

  return { message };
}

async function edit(user, input) {
  const result = await db.query(
    `UPDATE orders 
    SET delivery_address="${input.delivery_address}"
    WHERE user_id=${user.id} AND id=${input.order_id}`
  );
  let message = 'Error in update order';

  if (result.affectedRows) {
    message = 'updated order successfully';
  }

  return { message };
}

async function remove(user, input) {
  const result = await db.query(
    `UPDATE orders 
    SET isCancel=TRUE
    WHERE user_id=${user.id} AND id=${input.order_id}`
  );

  let message = 'Error in cancel order';

  if (result.affectedRows) {
    message = 'cancel order successfully';
  }

  return { message };
}

module.exports = {
  get, add, edit, remove
}