const express = require("express")
const app = express()

const cors = require("cors")

const PORT = process.env.PORT || 3500

app.use(cors())
app.use(express.json())

app.post("/signup", (req, res) => {
   console.log(req.body)
})

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))