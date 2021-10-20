let express = require("express");

let router = express.Router();

let controller = require("../controllers/contact");


// Create a contact 
// POST /contact -body{"firstname", "lastname", "email", "relationship"}
router.post("/contacts", controller.createContact);

// list contacts
// GET /contacts (make sure to keep the password out of this)
router.get("contacts", controller.listContact);

// updating contacts
// PUT /contact/:id -body{firstname, email}
// PUT /contact/password/:id -body{password}
router.put("/contact", controller.putContact);

// delete contact
// DELETE /contact/:id
router.delete("/contact", controller.deleteContact);

module.exports = router;