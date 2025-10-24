const express = require("express")
const router = express.Router()

const { handleRefresh } = require("../controller/refreshController")

router.get("/", handleRefresh)

module.exports = router