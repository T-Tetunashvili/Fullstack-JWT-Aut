import styles from "./SignUp.module.css"
import Input from "../../components/Input"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

const SignUp = () => {

   const {
      signUpData: {
         fullName, setFullName,
         email, setEmail,
         password, setPassword,
         confirmPassword, setConfirmPassword,
         isChecked, setIsChecked,
         signUpMutation
      }
   } = useContext(AppContext)

   const handleSubmit = (e) => {
      e.preventDefault()

      // send user data to the server (req.body can access it)
      signUpMutation.mutate({ fullName, email, password, confirmPassword, isChecked })
   }

   return (
      <div className={styles.bg}>
         <div className={styles.card}>
            <header className={styles.header}>
               <div className={styles.logo} aria-hidden="true">
                  <svg
                     width="40"
                     height="40"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#g)" />
                     <defs>
                        <linearGradient id="g" x1="0" x2="1">
                           <stop offset="0" stopColor="#7C3AED" />
                           <stop offset="1" stopColor="#06B6D4" />
                        </linearGradient>
                     </defs>
                  </svg>
               </div>
               <h1 className={styles.title}>Create your account</h1>
               <p className={styles.subtitle}>Fast, secure sign up — join us today.</p>
            </header>

            <form className={styles.form} onSubmit={handleSubmit} method="post" noValidate>
               <div className={styles.row}>
                  <Input
                     text="Full Name"
                     id="name"
                     type="text"
                     placeholder="you@example.com"
                     className={styles.input}
                     onChange={(e) => setFullName(e.target.value)}
                     value={fullName}
                  />
               </div>

               <div className={styles.row}>
                  <Input
                     text="Email"
                     id="email"
                     type="email"
                     placeholder="you@example.com"
                     className={styles.input}
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
                  />
               </div>

               <div className={styles.rowSplit}>
                  <div className={styles.rowHalf}>
                     <Input
                        text="Password"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                     />
                  </div>
                  <div className={styles.rowHalf}>
                     <Input
                        text="Confirm"
                        id="confirm"
                        type="password"
                        placeholder="••••••••"
                        className={styles.input}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                     />
                  </div>
               </div>

               <div className={styles.actions}>
                  <label className={styles.checkbox}>
                     <input
                        type="checkbox"
                        name="terms"
                        onChange={(e) => setIsChecked(e.target.checked)}
                        value={isChecked}
                     />
                     <span>I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a></span>
                  </label>
                  <button type="submit" className={styles.primary}>Create account</button>
               </div>
            </form>

            <div className={styles.footer}>
               <div className={styles.sep}><span>or continue with</span></div>
               <div className={styles.socials}>
                  <button className={styles.social} aria-label="Continue with Google">G</button>
                  <button className={styles.social} aria-label="Continue with Facebook">f</button>
                  <button className={styles.social} aria-label="Continue with Apple"></button>
               </div>
               <p className={styles.login}>Already have an account? <Link to="/sign-in">Sign in</Link></p>
            </div>
         </div>
      </div>
   )
}

export default SignUp