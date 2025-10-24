const usersDB = {
   users: require("../database/data.json"),
   setUsers: function (data) { this.users = data }
}

const fsPromises = require("fs").promises
const path = require("path")

const handleDeleteToken = async (req, res) => {
   const fullname = req.body.fullname

   if (!fullname) {
      return res.status(400).json({ error: "Fullname is required!" })
   }

   // delete refresh token in the users object in DB
   const otherUsers = usersDB.users.filter(user => user.fullname !== fullname)
   const currentUser = usersDB.users.find(user => user.fullname === fullname)

   if (!currentUser) {
      return res.status(404).json({ error: "User not found!" })
   }

   currentUser.refreshToken = ""
   usersDB.setUsers([...otherUsers, currentUser])
   fsPromises.writeFile(
      path.join(__dirname, "..", "database", "data.json"),
      JSON.stringify(usersDB.users, null, 3)
   )

   res.json({ message: "done" })
}

module.exports = { handleDeleteToken }