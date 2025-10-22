const usersDB = {
   users: require("../database/data.json"),
   setUsers: function (data) { this.users = data }
}

const fsPromises = require("fs").promises
const path = require("path")
const bcrypt = require("bcrypt")

const handleSignUp = async (req, res) => {
   const { fullName, email, password, confirmPassword, isChecked } = req.body

   if (!fullName || !email || !password || !confirmPassword || !isChecked) {
      return res.status(400).json({ message: "all the inputs are required! check the checkbox!" })
   }

   // check if same fullname exists 
   const duplicateName = usersDB.users.find(user => user.fullname === fullName)

   if (duplicateName) {
      return res.status(409).json({ message: "This full name already exists!" })
   }

   // check for duplicate emails in the db
   // you can't create acc with an existing email
   const duplicate = usersDB.users.find(user => {
      return user.email === email
   })

   if (duplicate) return res.status(409).json({ message: "this email already exists!" })

   // check if passwords match
   if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" })
   }

   try {
      // encrypt the password
      const hashedPwd = await bcrypt.hash(password, 10)

      // store new user
      const newUser = {
         "fullname": fullName,
         "email": email,
         "password": hashedPwd,
         "confirmPassword": confirmPassword
      }

      usersDB.setUsers([...usersDB.users, newUser])
      await fsPromises.writeFile(
         path.join(__dirname, "..", "database", "data.json"),
         JSON.stringify(usersDB.users, null, 3)
      )

      res.status(201).json({ success: `${fullName}` })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

module.exports = { handleSignUp }