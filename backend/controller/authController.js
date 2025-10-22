const usersDB = {
   users: require("../database/data.json"),
   setUsers: function (data) { this.users = data }
}

const bcrypt = require("bcrypt")

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
      res.status(201).send({ success: foundUser.fullname })
   } else {
      res.status(401).json({ message: "Password is incorrect!" })
   }
}

module.exports = { handleSignIn }