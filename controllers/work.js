let db = require("../db/db");

let createWorkContact = function (req, res) {
    console.log("INSIDE CREARE WORK CONTACT");

    /**
     * fisrtname
     * lastname
     * email
     * relationship
     */


    let sql = "INSERT INTO workContact (firstname, lastname, email, relationship) values (? , ? , ? , ?);"

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let relationship = req.body.relationship;

    let params = [];
    params.push(firstname);
    params.push(lastname);
    params.push(email);
    params.push(relationship);


    db.query(sql, params, function (error, rows) {
        if (error) {
            console.log("COULD NOT CREATE WORK CONTACT");
            res.sendStatus(500);
        } else {
            console.log("WORK CONTACT CREATED");
            res.sendStatus(204);
        }
    })
}

let listWorkContact = function (req, res) {
    console.log("INSIDE OF LIST WORK CONTACT")

    let sql = "SELECT id, firstname, lastname, email, relationship FROM workContact;"

    db.query(sql, function (error, rows) {
        if (error) {
            console.log("CAN NOT GET LIST OF WORK CONTACTS");
            res.sendStatus(500);
        } else {
            console.log("HERE IS YOUR LIST OF WORK CONTACTS");
            res.sendStatus(204);
        }
    })
}

let putWorkContact = function (req, res) {
    console.log("INSIDE OF UPDATE WORK CONTACT");

    let id = req.params.id;
    let firstname = req.body.firstname;
    let sql = "UPDATE workContact SET firstname = ? where id = ? ;"
    let params = [];
    params.push(id);
    params.push(firstname);

    db.query(sql, params, function (error, rows) {
        if (error) {
            console.log("COULD NOT UPDATE WORK CONTACT");
            res.sendStatus(500);
        } else {
            console.log("WORK CONTACT UPDATED");
            res.sendStatus(204);
        }
    })

}

let deleteWorkContact = function (req, res) {
    console.log("INSIDE OF DELETE WORK CONTACT");

    let id = req.params.id;
    let sql = "DELETE FROM workContact WHERE id = ?"
    let params = [];
    params.push(id);

    db.query(sql, params, function (error, rows) {
        if (error) {
            console.log("COULD NOT DELETE WORK CONTACT");
            res.sendStatus(500);
        } else {
            console.log("WORK CONTACT DELETED");
            res.sendStatus(204);
        }
    })
}

module.exports = { createWorkContact, listWorkContact, putWorkContact, deleteWorkContact };