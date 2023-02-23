const { Schema, model, Types } = require("mongoose");

const TranSchema = new Schema(
  {
    detail: {
      type: String,
      required: [true, "Please provide detail for the transaction"],
    },

    amount: {
      type: Number,
      required: [true, "Please provide detail for the transaction"],
    },
    income: {
      type: Number,
      default: 0,
      required: [true, "Is it an income?"],
    },
    expense: {
      type: Number,
      default: 0,
      required: [true, "Is it an expense?"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

TranSchema.pre("save", async function () {
  if (this.amount.toString().startsWith("-")) {
    this.expense = this.amount;
    return;
  }
  this.income = this.amount;
});

module.exports = model("Transaction", TranSchema);
