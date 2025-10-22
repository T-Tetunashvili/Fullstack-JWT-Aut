import styles from "./Home.module.css"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

const Home = () => {

   const { signUpData: { isLoggedIn, fullName, handleLogOut } } = useContext(AppContext)

   return (
      <>
         {isLoggedIn ? (
            <div className={styles.bg}>
               <div className={styles.container}>
                  <h1 className={styles.welcome}>Welcome
                     <span className={styles.name}>{fullName}</span>
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