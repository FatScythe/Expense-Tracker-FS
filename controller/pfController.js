const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const User = require("../model/User");

const changePfp = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("Please upload an image");
  }
  const profilePic = req.files.pfp;
  if (!profilePic.mimetype.startsWith("image")) {
    throw new BadRequestError("Please provide an image");
  }
  if (profilePic.size > process.env.MAX_SIZE) {
    throw new BadRequestError(
      `Image size must not be larger than ${process.env.MAX_SIZE} MB`
    );
  }

  // Uploads new profile picture : public_id gives a unique path, hence you can't have two images from one user
  const result = await cloudinary.uploader.upload(profilePic.tempFilePath, {
    // use_filename: true,
    folder: "Expense-tracker-app/users",
    public_id: `${req.user.userId}`,
  });

  fs.unlinkSync(profilePic.tempFilePath);

  const userImage = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { image: result.secure_url }
  );

  res.status(StatusCodes.ACCEPTED).json({ image: { src: result.secure_url } });
};

module.exports = { changePfp };
