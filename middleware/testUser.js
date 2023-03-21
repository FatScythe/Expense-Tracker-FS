const { BadRequestError } = require("../errors");

const testUser = async (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError(
      "Test user is not allowed to perform this operation"
    );
  }
  next();
};
module.exports = testUser;
