import { useNavigate } from "react-router-dom";
import { forgetPasswordRequest } from "../../services/user_service";
import {
  PageContainer,
  Form,
  FormGrp,
  FormTitle,
  TextField,
  SubmitButton,
  BackButton,
} from "../ChangePasswordPage/changePasswordElements";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../redux/actions/auth";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [success, setSucces] = useState(false);
  const dispatch = useDispatch();

  const handleForgetPassword = (e) => {
    dispatch(setIsLoading(true));
    e.preventDefault();
    const email = e.target[0].value;
    forgetPasswordRequest(email)
      .then((res) => {
        setDialogMsg(res.data.message);
        setIsDialogOpen(true);
        dispatch(setIsLoading(false));
        setSucces(true);
        e.target[0].value = "";
      })
      .catch((err) => {
        setDialogMsg(err?.response?.data?.message || err.message);
        setIsDialogOpen(true);
        dispatch(setIsLoading(false));
        setSucces(false);
        e.target[0].value = "";
      });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    if (success) {
      navigateToLogin();
    }
  };

  return (
    <PageContainer>
      <Form>
        <FormGrp style={{ top: "15%" }} onSubmit={handleForgetPassword}>
          <FormTitle>Forget Password Form</FormTitle>
          <TextField type="email" placeholder="Enter your account's email" />
          <SubmitButton type="submit"> Submit </SubmitButton>
          <BackButton onClick={navigateToLogin}> Back </BackButton>
        </FormGrp>
      </Form>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Change Password Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
