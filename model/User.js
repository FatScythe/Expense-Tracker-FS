const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dg0mkn4ld/image/upload/v1677053900/Expense-tracker-app/avatar_qirbmo.jpg",
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    minlength: [4, "Minimum character length is 4"],
    maxlength: [30, "Maximum character length for password is 30"],
    required: [true, "Please provide a password"],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePwd = async function (candidatePwd) {
  const isMatch = await bcrypt.compare(candidatePwd, this.password);
  return isMatch;
};

module.exports = model("User", UserSchema);
