let express = require("express")
let router = express.Router();
let controller = require("../controllers/favorite");

// create favoriteContact
//POST /favorite -body{"fullname", "lastname", "email", "relationship"}
router.post("/favorite", controller.createFavUser);

// list favoriteContact
// GET /contact (dont forget to leave password out of this)
router.get("/favorite", controller.listFavContact);

// updating favoriteContact
//PUT /favorite/:id -body{"firstname, email"}
//PUT /favorite/password/:id -body{password}
router.put("/favorite", controller.putFavContact);

// delete favoriteContact
// DELETE /favorite/:id
router.delete("favorite", controller.deleteFavContact);

module.exports = router;