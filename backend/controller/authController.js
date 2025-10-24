const usersDB = {
   users: require("../database/data.json"),
   setUsers: function (data) { this.users = data }
}

const bcrypt = require("bcrypt")

// import what's needed for JWTs
const jwt = require("jsonwebtoken")
require("dotenv").config()
const fsPromises = require("fs").promises
const path = require("path")

const handleSignIn = async (req, res) => {
   const { authEmail, authPassword } = req.body

   if (!authEmail || !authPassword) {
      return res.status(400).json({ message: "Fill the data!" })
   }

   const foundUser = usersDB.users.find(user => user.email === authEmail)

   if (!foundUser) {
      return res.status(401).json({ message: "This account doesn't exists!" })
   }

   // check if the password is correct
   const match = await bcrypt.compare(authPassword, foundUser.password)

   if (match) {
      // create JWTs
      const accessToken = jwt.sign(
         { "fullname": foundUser.fullname },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: "30s" }
      )

      const refreshToken = jwt.sign(
         { "fullname": foundUser.fullname },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: "2m" }
      )

      // Save refreshToken in the DB with users
      const otherUsers = usersDB.users.filter(user => user.fullname !== foundUser.fullname)
      const currentUser = { ...foundUser, refreshToken }
      usersDB.setUsers([...otherUsers, currentUser])
      await fsPromises.writeFile(
         path.join(__dirname, "..", "database", "data.json"),
         JSON.stringify(usersDB.users, null, 3)
      )

      // Store refreshToken in httpOnly cookie
      res.cookie("jwt", refreshToken, {
         httpOnly: true,
         sameSite: "None",
         secure: true,
         maxAge: 2 * 60 * 1000
      })

      // Send accessToken in the browser
      res.status(201).json({ success: foundUser.fullname, accessToken })
   } else {
      res.status(401).json({ message: "Password is incorrect!" })
   }
}

module.exports = { handleSignIn }