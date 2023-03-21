const router = require("express").Router();
const { register, login } = require("../controller/authController");
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);

module.exports = router;
