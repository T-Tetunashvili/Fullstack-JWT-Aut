import styles from "./Home.module.css"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const Home = () => {

   const navigate = useNavigate()

   const {
      signUpData: {
         isLoggedIn, fullName, handleLogOut, setIsLoggedIn
      },
      signInData: {
         name,
         storeAccessToken,
         setAuthEmail,
         setAuthPassword,
         isSignedIn
      }
   } = useContext(AppContext)

   let ACCESS_TOKEN = storeAccessToken

   const [logInUsersName, setLogInUsersName] = useState()

   const refreshAccessToken = async () => {
      try {
         // check refreshToken validity and generate new accessToken
         const res = await axios.get("http://localhost:3500/refresh", {
            withCredentials: true
         })

         setLogInUsersName(res.data.fullname)

         ACCESS_TOKEN = res.data.accessToken
         return ACCESS_TOKEN
      } catch (err) {
         // refresh token failed

         // so if refresh token failed it's time to kick users out of the acc!
         setIsLoggedIn(false)

         // remove refreshToken from users object in the database
         await axios.post("http://localhost:3500/deleteToken", { fullname: logInUsersName }, {
            headers: { "Content-Type": "application/json" }
         })

         setAuthEmail("")
         setAuthPassword("")
         navigate("/sign-in")
      }
   }

   const fetchProfile = async () => {
      try {
         // send first accessToken to the server
         const res = await axios.get("http://localhost:3500/profile", {
            headers: { Authorization: `Bearer ${storeAccessToken}` },
            withCredentials: true
         })

         return res.data
      } catch (err) {

         if (err?.response?.status === 403) {
            // when first accessToken expires then veify refreshToken to generate new accessToken
            const newToken = await refreshAccessToken()

            // send new accessToken to the server
            const retryRes = await axios.get("http://localhost:3500/profile", {
               headers: { Authorization: `Bearer ${newToken}` },
               withCredentials: true
            })

            return retryRes.data
         }
      }
   }

   useQuery({
      queryKey: ["profile"],
      queryFn: fetchProfile,
      retry: false,
      enabled: !!isLoggedIn,
      refetchInterval: 30_000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false
   })

   return (
      <>
         {isLoggedIn || isSignedIn ? (
            <div className={styles.bg}>
               <div className={styles.container}>
                  <h1 className={styles.welcome}>Welcome
                     <span className={styles.name}>{fullName}{name}</span>
                  </h1>
                  <div className={styles.logoutWrap}>
                     <button
                        onClick={handleLogOut}
                        className={styles.logout}
                        type="button"
                     >Log out</button>
                  </div>
               </div>
            </div>
         ) : (
            <div className={styles.bg}>
               <div className={styles.container}>
                  <h1 className={styles.brand}>Welcome</h1>

                  <div className={styles.ctaRow}>
                     <Link to="/sign-up" className={styles.primary}>Sign Up</Link>
                     <Link to="/sign-in" className={styles.ghost}>Sign In</Link>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default Home