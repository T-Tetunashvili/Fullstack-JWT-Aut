import { AppContext } from "./AppContext"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const AppProvider = ({ children }) => {

   const [fullName, setFullName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [isChecked, setIsChecked] = useState(false)

   const signUpMutation = useMutation({
      mutationFn: async (userData) => {
         const res = await axios.post("http://localhost:3500/signup", userData, {
            headers: { "Content-Type": "application/json" }
         })
         return res.data
      },
      onSuccess: () => console.log("User signed up!"),
      onError: () => console.log("Sign-up failed!")
   })

   const globalData = {
      signUpData: {
         fullName, setFullName,
         email, setEmail,
         password, setPassword,
         confirmPassword, setConfirmPassword,
         isChecked, setIsChecked,
         signUpMutation
      },
      signInData: {}
   }

   return (
      <AppContext.Provider value={globalData}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider