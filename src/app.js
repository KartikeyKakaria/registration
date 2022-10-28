const express = require('express');
const path = require('path')
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const User = require("./models/users")
require("./db/conn");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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
app.get("/login", (req, res) => {
    res.send('hi')
})
app.post("/register", async(req, res) => {
    try {
        const password = req.body.password;
        const confpassword = req.body.confpassword;
        if (password === confpassword) {
            const userdata = new User({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                address: req.body.address,
                age: req.body.age,
                password: password,
            });
            const result = await userdata.save();
            console.log(result)
            res.send(result);
        } else {
            res.status(400).send("paswords dont match")
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

app.listen(port, () => {
    console.log("listening at port " + port)
})