const router = require("express").Router();
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  clearAllTransaction,
} = require("../controller/transactionController");

router.route("/").get(getAllTransactions).post(addTransaction);
router.route("/clear").delete(clearAllTransaction);
router.route("/:id").delete(deleteTransaction);

module.exports = router;
