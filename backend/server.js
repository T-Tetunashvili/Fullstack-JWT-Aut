const express = require("express")
const app = express()

const cors = require("cors")
const cookieParser = require("cookie-parser")
const verifyJWT = require("./middleware/verifyJWT")

const PORT = process.env.PORT || 3500

app.use(cookieParser())
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}))
app.use(express.json())

app.use("/signup", require("./routes/signUp"))
app.use("/signin", require("./routes/auth"))
app.use("/refresh", require("./routes/refresh"))

// handle delete refresh token in the users object
app.use("/deleteToken", require("./routes/deleteToken"))

// protected route
app.get("/profile", verifyJWT, (req, res) => {
   res.json({ message: `Welcome ${req.user}! This is your profile!` })
})

app.use((err, req, res, next) => {
   console.error(err)
   res.status(500).send(err.message)
})

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))