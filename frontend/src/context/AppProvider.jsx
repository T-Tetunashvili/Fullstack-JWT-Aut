import { AppContext } from "./AppContext"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AppProvider = ({ children }) => {

   const navigate = useNavigate()

   // -------------------- STATE --------------------
   const [fullName, setFullName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [isChecked, setIsChecked] = useState(false)
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   // -------------------- RESTORE SESSION ON REFRESH --------------------
   useEffect(() => {
      const savedUser = localStorage.getItem("user")

      if (savedUser) {
         const user = JSON.parse(savedUser)
         setFullName(user.fullName)
         setIsLoggedIn(true)
      }
   })

   // -------------------- SIGN UP MUTATION --------------------
   const signUpMutation = useMutation({
      mutationFn: async (userData) => {
         const res = await axios.post("http://localhost:3500/signup", userData, {
            headers: { "Content-Type": "application/json" }
         })
         return res.data
      },
      onSuccess: (data) => {
         console.log("User", data.success, "signed up successfully!")

         // Save user data to localStorage so it's remembered
         localStorage.setItem("user", JSON.stringify({ fullName, email }))

         setIsLoggedIn(true)

         navigate("/")
      },
      onError: (error) => {
         if (error.response) {
            console.log("Status code:", error.response.status)
            console.log("Server responded with an error:", error.response.data.message)
         } else {
            console.log(`Error setting up request: ${error.message}`)
         }
      }
   })

   // -------------------- LOG OUT --------------------
   const handleLogOut = () => {
      setIsLoggedIn(false)

      // restart the states
      setFullName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")

      // remove and navigate
      localStorage.removeItem("user")
      navigate("/sign-in")
   }

   // -------------------- CONTEXT VALUE --------------------
   const globalData = {
      signUpData: {
         fullName, setFullName,
         email, setEmail,
         password, setPassword,
         confirmPassword, setConfirmPassword,
         isChecked, setIsChecked,
         signUpMutation,
         isLoggedIn,
         handleLogOut
      },
      signInData: {}
   }

   // -------------------- PROVIDER --------------------
   return (
      <AppContext.Provider value={globalData}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider