const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const userRoute = require("./routes/user-route") // user Route
const cors = require("cors");
const app = express();
const checkoutController = require('./controllers/checkoutController');

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/books", router); // localhost:5000/books
app.use("/user", userRoute); // user Route (register and login)
app.post('/api/checkout', checkoutController.createCheckout);

mongoose
  .connect(
    "mongodb+srv://rosssy:n3aE9TJ1hPH6fKiS@cluster0.bwyitdc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
  