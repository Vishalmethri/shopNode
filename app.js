const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

const errorController = require("./controllers/error");

const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("643c186ba058a61674ae2ad2")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);

app.use(shopRouter);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://vishmeth:vishmeth@cluster0.ehnxsjc.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(result => {
    User.findOne().then(user => {
      if(!user){
        const user = new User({
          name: "Vishal",
          email: "vishalmethri14@gmail.com",
          cart: {
            items: []
          },
        });
        user.save();
      }
    });
    app.listen(3000); 
  })
  .catch((err) => {
    console.log(err);
  });
