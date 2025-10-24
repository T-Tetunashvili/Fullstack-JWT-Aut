const express = require("express")
const router = express.Router()

const { handleDeleteToken } = require("../controller/deleteTokenController")

router.post("/", handleDeleteToken)

module.exports = router