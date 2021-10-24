let express = require("express");

let router = express.Router();

let controller = require("../controllers/auth");

router.get("/everyone", controller.everyone);


router.get("/authOnly", controller.checkJwt);

router.post("/login", [controller.loginCheck], controller.login)

router.post("/createUser", controller.createUser2);

module.exports = router;