const router = require("express").Router();
const { changePfp } = require("../controller/pfController");

router.route("/").post(changePfp);

module.exports = router;
