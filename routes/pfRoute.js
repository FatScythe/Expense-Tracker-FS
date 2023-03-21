const router = require("express").Router();
const { changePfp, changeUserInfo } = require("../controller/pfController");
const testUser = require("../middleware/testUser");

router.route("/user").patch(testUser, changeUserInfo);
router.route("/pfp").patch(testUser, changePfp);

module.exports = router;
