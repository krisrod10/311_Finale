let express = require("express");
let router = express.Router();
let controller = require("../controllers/work");
const { route } = require("./contact");

// create workContact
// POST / user -body{"firstname", "lastname", "email", "relationship"}
router.post("/work", controller.createWorkContact);

// list workContact
// GET /work (do not use the password in this)
router.get("/work", controller.listWorkContact);

// updating work contacts
// PUT /work/:id -body{"firstname", "email"}
//PUT /work/password/:id -body{"password"}
router.put("/work", controller.putWorkContact);

// delete workContact
// DELETE /work/:id
router.delete("/work", controller.deleteWorkContact);