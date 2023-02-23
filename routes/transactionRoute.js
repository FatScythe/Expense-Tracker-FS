const router = require("express").Router();
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
} = require("../controller/transactionController");

router.route("/").get(getAllTransactions).post(addTransaction);
router.route("/:id").delete(deleteTransaction);

module.exports = router;
