const router = require("express").Router();
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  clearAllTransaction,
} = require("../controller/transactionController");
const testUser = require("../middleware/testUser");

router.route("/").get(getAllTransactions).post(addTransaction);
router.route("/clear").delete(testUser, clearAllTransaction);
router.route("/:id").delete(testUser, deleteTransaction);

module.exports = router;
