let express = require("express");
let app = express();
let dotenv = require('dotenv').config();
let port = process.env.PORT || 3000;
let { auth, requiresAuth } = require('express-openid-connect');
let jsonwebtoken = require("jsonwebtoken");
let mysql = require("./db/mysql");
app.use(express.json());
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

app.get('/profile', requiresAuth(), function (req, res){
    res.send(JSON.stringify(req.oidc.user));
});
app.listen(port, () => {
    console.log("Listening on port", port);
})

app.get("/mysql", function(error, rows){
    mysql.query("select now()", function(error, rows){
        if(error){
            console.error("mysql query failed", error)
        } else{
            res.json(rows);
        }
    })
});

app.get("/psql", function(req, res){
    psql.query("select now()", function(error, rows){
        if(error){
            console.error("mysql query failed", error)
        } else {
            res.json(result.rows)
        }
    })
})


let example = function(){
    mysql.query("select id from users2 where fullname = ? ", ['users2'], function(error, rows){
        if(error){
            console.error("example query did not work");

        } else{
            res.sendStatus(200).json(rows);
        }
    })
}
let contactRoute = require("./routes/contact");
app.use(contactRoute);



let favContactRoute = require("./routes/favorite");
app.use(favContactRoute);



let workContactRoute = require("./routes/work");
app.use(workContactRoute);


let authLoginRoute = require("./routes/auth");
app.use(authLoginRoute);


require("./db/db");