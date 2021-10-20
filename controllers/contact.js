const e = require("express");
let db = require("../db/db");

let createContact = function (req, res) {
    console.log("inside create user");

    /**
     * firstname
     * lastname
     * email
     * relationship
     */

    let firstname = req.body.firstname;
    let lastname = req.body.lastname
    let email = req.body.email
    let relationship = req.body.relationship;

    //GET contact by ID


    let sql = "INSERT INTO contact2 (firstname, lastname, email, relationship) values(?, ?, ?, ?)"

    let params = [];
    params.push(firstname);
    params.push(lastname);
    params.push(email);
    params.push(relationship);

    db.query(sql, params, function (error, rows) {
        if (error) {
            console.log("INSERT contact failed", error);
            res.sendStatus(500);
        } else {
            console.log("USER ADDED");
            res.sendStatus(204);
        }
    })
}


let listContact = function (req, res) {
    console.log("GET /contact: ", req)// using this to make sure the connection works
    // res.json("Inside the place holder");


    let sql = "SELECT id, firstname, lastname, email, relationship FROM contact2;"

    db.query(sql, function (error, rows) {
        if (error) {
            console.log("Could not get contacts");
            res.sendStatus(500);
        } else {
            console.log("HERE is all contacts");
            res.send(rows);
        }
    })
}


let putContact = function (req, res) {
    console.log("INSIDE PUT CONTACT");

    let id = req.params.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let relationship = req.body.relationship;
    let sql = "UPDATE contact2 SET firstname = ?, lastname = ?, email = ?, relationship = ?, where id = ?;"

    let params = [];
    params.push(id);
    params.push(firstname);
    params.push(lastname);
    params.push(email);
    params.push(relationship);

    db.query(sql, params, function (error, rows) {
        if (error) {
            console.log("COULD NOT UPDATE CONTACT");
            res.sendStatus(500);
        } else {
            console.log("CONTACT UPDATED")
        }
    })
}

let deleteContact = function (req, res) {
    console.log("INSIDE DELETE USER");

    let id = req.params.id;
    let sql = "DELETE FROM contact2 where id = ?"
    let params = [];
    params.push(id);

    db.query(sql, params, function (error, rows) {
        if (error) {
            console.log("COULD NOT DELETE CONTACT");
            res.sendStatus(500);
        } else {
            console.log("CONTACT DELETED");
            res.sendStatus(200);
        }
    })
}

module.exports = { createContact, listContact, putContact, deleteContact };