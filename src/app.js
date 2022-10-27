const express = require('express');
const path = require('path')
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
require("./db/conn");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath)

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.listen(port, () => {
    console.log("listening at port " + port)
})