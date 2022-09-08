import styles from "./signup.module.css";
import { useState, useRef } from "react";
import {handleSignupAccount} from "../../services/user_service";

export default function LoginPage() {
  const loginRef = useRef();
  const regRef = useRef();
  const btnRef = useRef();

  const [isRegister, setIsRegister] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSignupAccount = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setIsLoading(true);
    
  }

  const handleLogin = (e) => {

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
        <h2 className={styles.h2}> Welcome to PeerPrep!</h2>
        <form ref={loginRef} className={styles.loginGrp} onSubmit={handleLogin}>
          <input type="email" name="email" className={styles.txtField} placeholder="Email required" required />
          <input type="password" name="password" className={styles.txtField} placeholder="Enter Password" required /> 
          <div className={styles.chkbox}>
            {/* <input type="checkbox"/> */}
            <a href="/home" className={styles.spn}> Forget Password </a>
          </div>
          
          <button type="submit" className={styles.submit} disabled={isLoading}> {isLoading ? "Loading..." : "Log in"}</button>
        </form>
        <form ref={regRef} className={styles.regGrp} onSubmit={handleSignupAccount}>
          <input type="email" name="email" className={styles.txtField} placeholder="Email required" required />
          <input type="password" name="password" className={styles.txtField} placeholder="Enter Password" required /> 
          <div className={styles.space}/>
          <button type="submit" className={styles.submit} disabled={isLoading}> {isLoading ? "Loading..." : "Register"} </button>
        </form>
      </div>
    </div>
  )
}