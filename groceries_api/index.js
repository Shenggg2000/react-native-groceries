const express = require("express");
const app = express();
const port = 3001;
const ProductsRouter = require("./routes/products");
const ProductCategoriesRouter = require("./routes/productcategories");
const UsersRouter = require("./routes/users");
const CartsRouter = require("./routes/carts");
const OrdersRouter = require("./routes/orders");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
process.env.TOKEN_SECRET;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "ok " });
});

app.use("/products", ProductsRouter);
app.use("/productcategories", ProductCategoriesRouter);
app.use("/users", UsersRouter);
app.use("/carts", CartsRouter);
app.use("/orders", OrdersRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});