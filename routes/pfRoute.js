const router = require("express").Router();
const { changePfp, changeUserInfo } = require("../controller/pfController");

router.route("/user").patch(changeUserInfo);
router.route("/pfp").patch(changePfp);

module.exports = router;
