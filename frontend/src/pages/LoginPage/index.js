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
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setIsLoading, setJwtToken, setUserId, setUserEmail } from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const loginRef = useRef();
  const regRef = useRef();
  const btnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const isLoading = useSelector(state => state.authReducer.isLoading);
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
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogMsg("");
    setDialogTitle("");
  }

  const handleSignupAccount = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    dispatch(setIsLoading(true));
    const {statusCode, message} = await handleCreateNewAccount(email, password);
    setDialogMsg(message);
    setIsDialogOpen(true);
    if (statusCode === 201) {
      setDialogTitle("Registration Success!");
      handleToggle(); //move to login
      regRef.current.reset(); //reset form values
      loginRef.current.email.value = email;
      loginRef.current.password.value = password;      
    } else {
      setDialogTitle("Registration Failed!");
    }
    
    dispatch(setIsLoading(false));
  };

  const handleLoginAccount = async (e) => {
    e.preventDefault();
    const userEmail = e.target[0].value;
    const userPassword = e.target[1].value;
    dispatch(setIsLoading(true));
    const {statusCode, email, id, message} = await handleLogin(userEmail, userPassword);
    if (statusCode === 200) {
      dispatch(setIsLoggedIn(true));
      dispatch(setIsLoading(false));
      dispatch(setUserId(id));
      dispatch(setUserEmail(email));
      navigate('/home');
    } else {
      setDialogTitle("Login Failed!");
      setDialogMsg(message + "Please try again!");
      setIsDialogOpen(true);
      dispatch(setIsLoading(false));
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
