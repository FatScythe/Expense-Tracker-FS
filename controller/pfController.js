const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const changePfp = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("Please upload an image");
  }
  const profilePic = req.files.pfp;
  if (!profilePic.mimetype.startsWith("image")) {
    throw new BadRequestError("Please provide an image");
  }

  res.status(StatusCodes.ACCEPTED).json(req.files);
};

module.exports = { changePfp };
