import styles from "./signup.module.css";
import { useState, useRef } from "react";

export default function SignupPage() {
  const loginRef = useRef();
  const regRef = useRef();
  const btnRef = useRef();

  const [isRegister, setIsRegister] = useState(true);
  
  const handleToggle = () => {
    if (isRegister) {
      loginRef.current.style.left = "-400px";
      regRef.current.style.left = "50px";
      btnRef.current.style.left = "110px";
    } else {
      loginRef.current.style.left = "50px";
      regRef.current.style.left = "450px";
      btnRef.current.style.left = "0px";
    }  
    setIsRegister(!isRegister);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.form}> 
        <div className={styles.formButton}>
          <div ref={btnRef} className={styles.btnTransition}/>
          <button className={styles.button} onClick={handleToggle}>
            Log in
          </button>
          <button className={styles.button} onClick={handleToggle}>
            Sign Up
          </button>
        </div>
        <form ref={loginRef} className={styles.loginGrp}>
          <input type="email" className={styles.txtField} placeholder="Email required" required />
          <input type="text" className={styles.txtField} placeholder="Enter Password" required /> 
          <div className={styles.chkbox}>
            <input type="checkbox"/>
            <span className={styles.spn}> Remember Password </span>
          </div>
          
          <button type="submit" className={styles.submit}> Log in</button>
        </form>
        <form ref={regRef} className={styles.regGrp}>
          <input type="email" className={styles.txtField} placeholder="Email required" required />
          <input type="text" className={styles.txtField} placeholder="Enter Password" required /> 
          <div className={styles.space}/>
          <button type="submit" className={styles.submit}> Register </button>
        </form>
      </div>
    </div>
  )
}