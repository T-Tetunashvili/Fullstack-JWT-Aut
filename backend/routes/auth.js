const express = require("express")
const router = express.Router()

const { handleSignIn } = require("../controller/authController")

router.post("/", handleSignIn)

module.exports = router