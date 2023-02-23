const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  const token = await user.createJWT();

  res.status(StatusCodes.CREATED).json({ name, email, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePwd(password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      image: user.image,
      token,
    },
  });
};

module.exports = { register, login };
