const { Router } = require("express");
const e = require("express");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv").config();
let db = require("../db/db");

let isAdmin = (req, res, next) => {
    if (req.isAdmin) {
        next();
    } else {
        res.status(401).send("UNAUTHORIZED")
    }
}

// the middle ware function to call when processing an authorized URL
let checkJwt = (req, res, next) => {
    console.log("processing JWT authentication check");

    // read the token from the header
    let token;
    if (req.headers.authorization) {
        let bearer = req.headers.authorization.split(" ");
         token = bearer[1];
    } else {
        token = null;
    }
    if (!token) {
        return res.status(401).send("UNAUTHORIZED");
    }
    jwt.verify(token, jwtSecret, (err, decoded) => {
        // if we get an error message then the token is not valid
        if (err) {
            console.log("Did not verify jwt", err);
            return res.status(401).send("UNAUTHORIZED");
        }
        // the token is valid, store the username from the token in the request, so that it is
        // avaliable to all following this call
        console.log(decoded);
        req.username = decoded.username;
        req.isAdmin = decoded.role == 'admin'
        // call the next middleware function in the chain
        next();
    });
}
let login = function (req, res) {
    // note that we do not print the body, since we do not want to leak the password to our logs
    console.log("POST /login", req.body.username);

    // read the username and password from the body post
    let username = req.body.username;
    let password = req.body.username;

    // select the username, role and stored hash from the db for the user passed in
    db.query("SELECT username, password  from users2 where username = ? ;", [username], (err, rows) => {
        // assume the password provided in the request is bad
        let goodPassword = false;
        let role;

        // if the database failed then log an error
        if (err) {
            console.error("Error when querying the db", err);
        }
        // if the databse returned too many rows the log the error
        if (rows.length > 1) {
            console.error("Found too many rows with the username ", username);
        }
        // if the database returned no rows, then log it, but its not an error
        // maybe the username never signed up with your application
        if (rows.length == 0) {
            console.log("Did not find a row with that username", username);
        }

        // if querry ran without an error, and only 1 row came back,
        // then check the stored hash agains the password provided in the request
        if (!err && rows.length == 1) {
            row = rows[0];

            // get the stored hash from the database
           let hash = row.password_hash;

            // get the role from the database
            role = row.role;

            // check that the hash in the database matches the password provided
            goodPassword = bcrypt.compareSync(password, hash);
        }
        // if the password provided is not good then return
        // a signed copy of the access token
        if (goodPassword) {
            // the token should include things that you are sending back to the client
            // which include the username and role
            // not a good idea to send the password or the hash of the password back
            let unsignedToken = {
                username: username,
                role: role
            };
            // sing the token using the JWT secret
            let accessToken = jwt.sign(unsignedToken, process.env.jwtSecret);

            // send the signed token back
            res.json(accessToken);
        } else {
            // if the password provided was not good, or was not able to be verified
            // send an unauthorized message and code back
            res.status(401).send("Unauthorized");
        }
    });
}

let createUser2 = function (req, res) {
    // note that we do not include the password in the log
    console.log("POST /createUser", req.body.username);
    let username = req.body.username;
    let password = req.body.password;

    // generate the hash of the password that will be stored in the database
    let passwordHash = bcrypt.hashSync(password, 10);

    let sql = "INSERT INTO users2(username, password) VALUES (?, ? );"
    db.query(sql, [username, passwordHash], (err, rows) => {
        // if the insert query returned an error, we log the error
        // and return a failed message back
        if (err) {
            console.error("Failed to add user", err);
            res.status(500).send("Failed to add user");
        } else {
            // if the insert statement ran with out an error, then the user was created
            res.send("User created");
        }
    })
}
let everyone = function (req, res) {
    res.json("Everyone can");
}

let loginCheck = function (req, res) {
    console.log("INSIDE OF LOGIN CHECK")
    let body = req.body;
    
}


module.exports = { checkJwt, isAdmin, login, createUser2, everyone, loginCheck };