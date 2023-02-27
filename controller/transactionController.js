const mongoose = require("mongoose");
const Transaction = require("../model/Transaction");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const addTransaction = async (req, res) => {
  const { detail, amount } = req.body;
  const { userId } = req.user;
  const createdBy = userId;

  if (!detail || !amount) {
    throw new BadRequestError("Please provide detail and amount");
  }

  const transaction = await Transaction.create({ detail, amount, createdBy });

  res.status(StatusCodes.CREATED).json({
    transaction: {
      detail: transaction.detail,
      amount: transaction.amount,
      createdBy,
    },
  });
};

const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find({
    createdBy: req.user.userId,
  });

  const [stats] = await Transaction.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: "$createdBy",
        balance: { $sum: "$amount" },
        income: { $sum: "$income" },
        expense: { $sum: "$expense" },
      },
    },
  ]);

  res.status(StatusCodes.OK).json({
    balance: stats.balance,
    income: stats.income,
    expense: stats.expense,
    transactions,
  });
};

const deleteTransaction = async (req, res) => {
  const {
    params: { id: transactionId },
    user: { userId },
  } = req;
  const transaction = await Transaction.findByIdAndRemove({
    _id: transactionId,
    createdBy: userId,
  });
  res.status(StatusCodes.OK).json({
    msg: `Transaction with id: ${transactionId} was deleted successfully`,
  });
};

module.exports = {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
};
