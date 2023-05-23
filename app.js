const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes.js");

const app = express();
const dbURI = "mongodb database link";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

//register view engine
app.set("view engine", "ejs");

//middleware static files
app.use(express.static("public"));

//to get form input info
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
