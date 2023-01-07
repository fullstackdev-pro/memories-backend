const express = require("express");

const { signIn, signUp } = require("../controllers/user.js");

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

module.exports = router;
