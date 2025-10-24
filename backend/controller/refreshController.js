const usersDB = {
   users: require("../database/data.json"),
   setUsers: function (data) { this.users = data }
}

const jwt = require("jsonwebtoken")
require("dotenv").config()

const handleRefresh = (req, res) => {
   const cookies = req.cookies

   if (!cookies?.jwt) return res.sendStatus(401)

   const refreshToken = cookies.jwt

   const foundUser = usersDB.users.find(user => {
      return user.refreshToken === refreshToken
   })

   if (!foundUser) return res.sendStatus(403)

   jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
         if (err || foundUser.fullname !== decoded.fullname) {
            return res.status(403).json({ message: "Refresh token expired!" })
         }

         const accessToken = jwt.sign(
            { "fullname": decoded.fullname },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
         )

         res.json({ accessToken, fullname: decoded.fullname })
      }
   )
}

module.exports = { handleRefresh }