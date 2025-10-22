const express = require("express")
const router = express.Router()

const { handleSignUp } = require("../controller/handleSignUp")

router.post("/", handleSignUp)

module.exports = router