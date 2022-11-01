require("dotenv").config(); //.env configurtaion
//essential variables for code
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
const User = require("./models/users")
const auth = require("./middleware/auth")

// const crud = require("./crud")
const app = express();
const port = process.env.PORT || 8000;

//paths for serving files
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
require("./db/conn");

//serving files
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath)

//routers
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/user", auth, (req, res) => {
    res.render("user")
})
app.post("/user", auth, (req, res) => {
    res.send(req.user);
})

//logout user
app.get("/logout", auth, async(req, res) => {
    try {
        res.clearCookie("jwt")
        req.user.tokens = req.user.tokens.filter((element) => {
            return element.token !== req.token
        })
        console.log("logout successfully")
        await req.user.save();
        res.render("login")
    } catch (error) {
        res.status(500).send(error)

    }
})

//register user
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

            const token = await userdata.generateAuthToken();
            // console.log('the token is' + token)

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 2628002880),
                // httpOnly:true
            })


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

//login user
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await User.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, result.password);

        // console.log(token)


        if (isMatch) {
            const token = await result.generateAuthToken()
            res.cookie("jwt", result.tokens[0].token, {
                expires: new Date(Date.now() + 2628002880),
            });

            console.log("The cookie is " + req.cookies.jwt)
            res.status(200).send("valid yay")
        } else {
            res.status(400).send("invalid credentials");

        }
    } catch (error) {
        res.status(400).send("invalid login credentials")
    }
})

//telling the server that cookie exists or not
app.post("/isCookieThere", async(req, res) => {
    res.send(req.cookies.jwt)
})

//listening to the server
app.listen(port, () => {
    console.log("listening at port " + port)
})