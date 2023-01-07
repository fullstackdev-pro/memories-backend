const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../modules/User.js");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (!existUser)
      return res.status(404).json({ message: "User does't exists" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid message" });

    const token = jwt.sign(
      { email: existUser.email, id: existUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existUser = await User.findOne({ email });
    
    if (existUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {signIn, signUp}