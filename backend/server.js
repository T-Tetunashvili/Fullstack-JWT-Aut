const express = require("express")
const app = express()

const cors = require("cors")

const PORT = process.env.PORT || 3500

app.use(cors())
app.use(express.json())

app.use("/signup", require("./routes/signUp"))
app.use("/signin", require("./routes/auth"))

app.use((err, req, res, next) => {
   console.error(err)
   res.status(500).send(err.message)
})

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))