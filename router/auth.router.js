const express = require("express");
const router = express.Router();
const { validator } = require("../middlewares/validator");
const { signupSchema } = require("../validations/auth/signup.validation");
const { User } = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const { signinSchema } = require("../validations/auth/signin.validation");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../lib/services/sendEmail");
const { getCode } = require("../lib/helpers/getCode");
const { Otp } = require("../schema/otp.schema");

router.post("/signup", validator(signupSchema), async (req, res) => {
  const { password, ...data } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newPayload = {
    password: hashedPassword,
    ...data,
  };
  const otpCode = getCode();

  const newUser = new User(newPayload);
  const newOTP = new Otp({
    userId: newUser._id,
    code: otpCode,
  });

  await Promise.all([
    newUser.save(),
    newOTP.save(),
    sendEmail({
      to: data.email,
      subject: "Account Verification",
      text: `Please verify your account using this OTP: ${otpCode}`,
    }),
  ]);

  return res
    .status(201)
    .send({ data: newUser.id, message: "User signup successfully" });
});

router.post("/signin", validator(signinSchema), async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email }).select("email password");
  if (!user) {
    res.status(401).send({ error: "Invalid Credential" });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    res.status(401).send({ error: "Invalid Credential" });
  }

  const tokenPayload = { id: user.id, email: user.email };

  const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .send({ data: { accessToken }, message: "User Signin successfully" });
});

module.exports = { router };
