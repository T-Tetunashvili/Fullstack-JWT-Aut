import styles from "./SignIn.module.css"
import { Link } from "react-router-dom"
import Input from "../../components/Input"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

const SignIn = () => {

   const {
      signInData: {
         authEmail, setAuthEmail,
         authPassword, setAuthPassword,
         rememberChecked, setRememberChecked,
         signInMutation
      }
   } = useContext(AppContext)

   const handleSignIn = (e) => {
      e.preventDefault()

      // send user data while sign in to the server
      signInMutation.mutate({ authEmail, authPassword, rememberChecked })
   }

   return (
      <div className={styles.bg}>
         <div className={styles.card}>
            <header className={styles.header}>
               <h2 className={styles.title}>Welcome back</h2>
               <p className={styles.subtitle}>Sign in to continue to your account</p>
            </header>

            <form onSubmit={handleSignIn} className={styles.form} action="#" method="post" noValidate>
               <Input
                  text="Email"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={styles.input}
                  onchange={(e) => setAuthEmail(e.target.value)}
                  value={authEmail}
               />
               <Input
                  text="Password"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={styles.input}
                  onchange={(e) => setAuthPassword(e.target.value)}
                  value={authPassword}
               />

               <div className={styles.rowBetween}>
                  <label className={styles.remember}>
                     <input
                        type="checkbox"
                        name="remember"
                        onChange={(e) => setRememberChecked(e.target.checked)}
                        value={rememberChecked}
                     /> Remember me
                  </label>
                  <a href="#" className={styles.forgot}>Forgot password?</a>
               </div>

               <button type="submit" className={styles.primary}>Sign in</button>
            </form>

            <div className={styles.footer}>
               <div className={styles.sep}><span>or continue with</span></div>
               <div className={styles.socials}>
                  <button className={styles.social} aria-label="Continue with Google">G</button>
                  <button className={styles.social} aria-label="Continue with Facebook">f</button>
                  <button className={styles.social} aria-label="Continue with Apple"></button>
               </div>
               <p className={styles.signup}>Don't have an account? <Link to="/sign-up">Sign up</Link></p>
            </div>
         </div>
      </div>
   )
}

export default SignIn