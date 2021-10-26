let express = require("express");
let app = express();
let dotenv = require('dotenv').config();
let port = process.env.PORT || 3000;
let { auth, requiresAuth } = require('express-openid-connect');
let jsonwebtoken = require("jsonwebtoken");
app.use(
    auth({
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET
    })
);

app.get('/', function (req, res) {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

app.get('/profile', requiresAuth(), function (req, res) {
    res.send(JSON.stringify(req.oidc.user));
})
app.listen(port, () => {
    console.log("Listening on port", port);
})

let contactRoute = require("./routes/contact");
app.use(contactRoute);



let favContactRoute = require("./routes/favorite");
app.use(favContactRoute);



let workContactRoute = require("./routes/work");
app.use(workContactRoute);


let authLoginRoute = require("./routes/auth");
app.use(authLoginRoute);


require("./db/db");