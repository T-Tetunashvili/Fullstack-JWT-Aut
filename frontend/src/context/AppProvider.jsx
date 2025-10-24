import { AppContext } from "./AppContext"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AppProvider = ({ children }) => {

   const navigate = useNavigate()

   // -------------------- STATE --------------------
   // sign up states
   const [fullName, setFullName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [isChecked, setIsChecked] = useState(false)
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [isSignedIn, setIsSignedIn] = useState(false)

   // sign in states
   const [authEmail, setAuthEmail] = useState("")
   const [authPassword, setAuthPassword] = useState("")
   const [rememberChecked, setRememberChecked] = useState(false)
   // display name when user will be logged in
   const [name, setName] = useState("")

   // store accessToken in memory
   const [storeAccessToken, setStoreAccessToken] = useState()

   // -------------------- RESTORE SESSION ON REFRESH --------------------
   useEffect(() => {
      const savedUser = localStorage.getItem("user")

      if (savedUser) {
         const user = JSON.parse(savedUser)
         setFullName(user.fullName ? user.fullName : fullName)
         setName(user.name)
         setIsLoggedIn(true)
      }
   }, [name, isLoggedIn])

   // -------------------- SIGN UP MUTATION --------------------
   const signUpMutation = useMutation({
      mutationFn: async (userData) => {
         const res = await axios.post("http://localhost:3500/signup", userData, {
            headers: { "Content-Type": "application/json" }
         })
         return res.data
      },
      onSuccess: (data) => {
         window.alert(`User ${data.success} signed up successfully!`)

         // Save user data to localStorage so it's remembered
         localStorage.setItem("user", JSON.stringify({ fullName }))

         setIsSignedIn(true)

         navigate("/")
      },
      onError: (error) => {
         if (error.response) {
            window.alert(`Status: ${error.response.status}; ${error.response.data.message}`)
         } else {
            console.log(`Error setting up request: ${error.message}`)
         }
      }
   })

   // -------------------- SIGN IN MUTATION --------------------
   const signInMutation = useMutation({
      mutationFn: async (authUserData) => {
         const res = await axios.post("http://localhost:3500/signin", authUserData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
         })

         return res.data
      },
      onSuccess: (data) => {
         window.alert(`User ${data.success} logged in successfully!`)

         const name = data.success

         setStoreAccessToken(data.accessToken)

         // Save user data to localstorage so it's remembered
         localStorage.setItem("user", JSON.stringify({ name }))

         setIsLoggedIn(true)

         navigate("/")
      },
      onError: (error) => {
         if (error.response) {
            window.alert(`Status: ${error.response.status}; ${error.response.data.message}`)
         } else {
            console.log(`Error setting up request: ${error.message}`)
         }
      }
   })

   // -------------------- LOG OUT --------------------
   const handleLogOut = () => {
      setIsLoggedIn(false)
      setIsSignedIn(false)

      // restart the states
      setFullName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      // restart the state for sign in data
      setAuthEmail("")
      setAuthPassword("")

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
         isLoggedIn, setIsLoggedIn,
         handleLogOut
      },
      signInData: {
         authEmail, setAuthEmail,
         authPassword, setAuthPassword,
         rememberChecked, setRememberChecked,
         signInMutation,
         name,
         storeAccessToken,
         isSignedIn
      }
   }

   // -------------------- PROVIDER --------------------
   return (
      <AppContext.Provider value={globalData}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider