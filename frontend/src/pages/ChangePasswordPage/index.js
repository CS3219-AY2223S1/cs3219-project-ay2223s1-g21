import {
  PageContainer,
  Form,
  TextField,
  SubmitButton,
  FormTitle,
  FormGrp,
  BackButton,
} from "./changePasswordElements";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useState } from "react";
import { changePassword } from "../../services/user_service";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function ChangePasswordPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userId, jwtToken } = useSelector((state) => state.authReducer);
  const [dialogMsg, setDialogMsg] = useState("");
  const [success, setSucces] = useState(false);
  const navigate = useNavigate();

  const closeDialog = () => {
    setIsDialogOpen(false);
    if (success) {
      navigate("/profile");
    }
  };

  const dispatch = useDispatch();

  const handleChangePassword = (e) => {
    dispatch(setIsLoading(true));
    e.preventDefault();
    const curPw = e.target[0].value;
    const newPw = e.target[1].value;
    const newRetypedPw = e.target[2].value;
    const axiosPromise = changePassword(
      userId,
      curPw,
      newPw,
      newRetypedPw,
      jwtToken
    );
    axiosPromise
      .then((res) => {
        setDialogMsg(res.data.message);
        setIsDialogOpen(true);
        dispatch(setIsLoading(false));
        setSucces(true);
      })
      .catch((err) => {
        setDialogMsg(err?.response?.data?.message || err.message);
        setIsDialogOpen(true);
        dispatch(setIsLoading(false));
        setSucces(false);
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
      });
  };

  const navigateBack = () => {
    navigate("/profile");
  };

  return (
    <>
      <PageContainer>
        <Navbar curUrl={"/change_password"} />
        <Form>
          <FormGrp onSubmit={handleChangePassword}>
            <FormTitle> Change Password Form </FormTitle>
            <TextField
              type="password"
              placeholder="Type in your current password"
            />
            <TextField
              type="password"
              placeholder="Type in your new password"
            />
            <TextField
              type="password"
              placeholder="Re-type your new passowrd"
            />
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
    </>
  );
}
