const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyJWT = (req, res, next) => {
   const authHeader = req.headers.authorization

   if (!authHeader) return res.sendStatus(401)

   // take the token
   const token = authHeader.split(" ")[1]

   if (!token) return res.sendStatus(401)

   jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
         if (err) return res.status(403).json({ tokenMessage: "accessToken invalid!" })
         req.user = decoded.fullname
         next()
      }
   )
}

module.exports = verifyJWT