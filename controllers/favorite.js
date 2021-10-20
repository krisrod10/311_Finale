let db = require("../db/db");

let createFavUser = function (req, res) {
    console.log("INSIDE FAVORITE CONTACT");

    /**
     * firstname
     * lastname
     * email
     * relationship
     */

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let relationship = req.body.relationship;

    let sql = "INSERT INTO favoriteContact (firstname, lastname, email, relationship) values(?, ?, ?, ?);"

    let params = [];
    params.push(firstname);
    params.push(lastname);
    params.push(email);
    params.push(relationship);

    db.query(sql, params, function (error, rows) {
        if (error) {
            console.log("COULD NOT CREATE FAVORITE USER");
            res.sendStatus(500);
        } else {
            console.log("FAVORITE CONTACT ADDED");
            res.sendStatus(204);
        }
    })
}

let listFavContact = function (res, res) {
    console.log("Inside list fav contact");


    let sql = "SELECT id, firstname, lastname, email, relationship FROM favoriteContact;"

    db.query(sql, function (error, rows) {
        if (error) {
            console.log("COULD NOT GET FAV CONTACT");
            res.sendStatus(500);
        } else {
            console.log("HERE IS YOUR LIST OF FAV CONTACTS");
            res.sendStatus(204);
        }
    })
}

let putFavContact = function (req, res) {
    console.log("INSIDE OF UPDATE FAV CONTACT");

    let id = req.params.id;
    let firstname = req.body.firstname
    let sql = "UPDATE favoriteContact SET firstname = ? where id = ? ;"
    let params = [];
    params.push(id);
    params.push(firstname);

    db.query(sql, params, function (error, rows) {
        if (error) {
            console.log("COULD NOT UPDATE FAV CONTACT");
            res.sendStatus(500);
        } else {
            console.log("FAVORITE CONTACT UPDATED");
            res.sendStatus(204);
        }
    })

}

let deleteFavContact = function (req, res) {
    console.log("INSIDE DELETE FAVORITE CONTACT");

    let id = req.params.id;
    let sql = "DELETE FROM favoriteContact where id = ? "
    let params = [];
    params.push(id);

    db.query(sql, params, function (error, rows) {
        if (error) {
            console.log("COULD NOT DELETE FAVORITE CONTACT");
            res.sendStatus(500);
        } else {
            console.log("FAVORITE CONTACT DELETED");
            res.sendStatus(204);
        }
    })
}


module.exports = { createFavUser, listFavContact, putFavContact, deleteFavContact };