import styles from "./signup.module.css";
import { useState, useRef } from "react";
import { handleCreateNewAccount, handleLogin } from "../../services/user_service";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { setDialogMsg, setDialogTitle, setIsDialogOpen, setIsLoggedIn } from "../../redux/actions/auth";

export default function LoginPage() {
  const loginRef = useRef();
  const regRef = useRef();
  const btnRef = useRef();
  const dispatch = useDispatch();

  const { isDialogOpen, dialogTitle, dialogMsg } = useSelector(state => state.authReducer);

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
  };

  const closeDialog = () => {
    dispatch(setIsDialogOpen(false));
    dispatch(setDialogMsg(""));
    dispatch(setDialogTitle(""));
  }

  const handleSignupAccount = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setIsLoading(true);
    const {statusCode, message} = await handleCreateNewAccount(email, password);
    dispatch(setDialogMsg(message));
    dispatch(setIsDialogOpen(true));
    if (statusCode === 201) {
      dispatch(setDialogTitle("Registration Success!"));
      handleToggle(); //move to login
      regRef.current.reset(); //reset form values
      loginRef.current.email.value = email;
      loginRef.current.password.value = password;
    } else {
      dispatch(setDialogTitle("Registration Failed!"));
    }
    
    setIsLoading(false);
  };

  const handleLoginAccount = async (e) => {
    try {
      e.preventDefault();
      const userEmail = e.target[0].value;
      const userPassword = e.target[1].value;
      setIsLoading(true);
      const {statusCode, email, id} = await handleLogin(userEmail, userPassword);
      if (statusCode === 200) {
        dispatch(setIsLoggedIn(true));
        window.location.pathname = "/home";
      } else {
        dispatch(setDialogTitle("Login Failed!"));
        dispatch(setDialogMsg("Your email or password is invalid. Please try again!"));
        dispatch(setIsDialogOpen(true));
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.form}>
        <div className={styles.formButton}>
          <div ref={btnRef} className={styles.btnTransition} />
          <button className={styles.button} onClick={handleToggle}>
            Log in
          </button>
          <button className={styles.button} onClick={handleToggle}>
            Sign Up
          </button>
        </div>
        <h2 className={styles.h2}> Welcome to PeerPrep!</h2>
        <form ref={loginRef} className={styles.loginGrp} onSubmit={handleLoginAccount}>
          <input
            type="email"
            name="email"
            className={styles.txtField}
            placeholder="Email required"
            required
          />
          <input
            type="password"
            name="password"
            className={styles.txtField}
            placeholder="Enter Password"
            required
          />
          <div className={styles.chkbox}>
            {/* <input type="checkbox"/> */}
            <a href="/home" className={styles.spn}>
              Forget Password
            </a>
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? "Loading..." : "Log in"}
          </button>
        </form>
        <form
          ref={regRef}
          className={styles.regGrp}
          onSubmit={handleSignupAccount}
        >
          <input
            type="email"
            name="email"
            className={styles.txtField}
            placeholder="Email required"
            required
          />
          <input
            type="password"
            name="password"
            className={styles.txtField}
            placeholder="Enter Password"
            required
          />
          <div className={styles.space} />
          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
