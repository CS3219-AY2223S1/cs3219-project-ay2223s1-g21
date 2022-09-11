import { useSearchParams } from "react-router-dom";
import {
  PageContainer,
  Form,
  FormGrp,
  FormTitle,
  SubmitButton,
  TextField,
  BackButton
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../redux/actions/auth";
import { ResetPasswordRequest } from "../../services/user_service";

export default function ResetPassword() {
  // setSearchParams not suppose to be used.
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [success, setSucces] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetPassword = (e) => {
    dispatch(setIsLoading(true));
    e.preventDefault();
    const newPassword = e.target[0].value;
    ResetPasswordRequest(id, token, newPassword)
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
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
    if (success) {
      navigateBack();
    }
  };

  const navigateBack = () => {
    navigate('/login');
  }

  return (
    <PageContainer>
      <Form>
        <FormGrp style={{top: '20%'}}onSubmit={handleResetPassword}>
          <FormTitle>Reset Password Form</FormTitle>
          <TextField type="password" placeholder="Enter your new password" />
          <SubmitButton type="submit"> Submit </SubmitButton>
          <BackButton onClick={navigateBack}> Back </BackButton>
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
