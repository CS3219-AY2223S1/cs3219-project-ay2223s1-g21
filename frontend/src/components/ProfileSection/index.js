import {
  ButtonContainer,
  Divider,
  Container,
  Background,
  Profile,
  ProfileImg,
  ProfileDescription,
} from "./ProfileElements";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import profileImg from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setIsLoading } from "../../redux/actions/auth";
import { deleteAccount } from "../../services/user_service";

const ProfileSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [secondDialogMsg, setSecondDialogMsg] = useState("");
  const { jwtToken, userId, userEmail } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigateToChangePassword = () => {
    navigate("/change_password");
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteAccount = () => {
    setIsDialogOpen(false);
    dispatch(setIsLoading(true));
    const axiosPromise = deleteAccount(userId, jwtToken);
    axiosPromise
      .then((res) => {
        setSecondDialogMsg(res.data.message)
      })
      .catch((err) => setSecondDialogMsg(err.response.data.message));
    setIsSecondDialogOpen(true);
    dispatch(setIsLoading(false));
  };

  const handleRefreshPage = () => {
    dispatch(setIsLoading(true));
    setIsSecondDialogOpen(false);
    dispatch(setIsLoading(false));
    window.location.reload();
    
  };

  return (
    <Container id="home">
      <Background />
      <Profile>
        <ProfileImg src={profileImg} />
        <Divider />
        <ProfileDescription>
          Id: {userId}
          <br />
          Email: {userEmail}
        </ProfileDescription>
        <ButtonContainer>
          <Button
            variant="contained"
            size="small"
            onClick={handleNavigateToChangePassword}
          >
            Change Password
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleOpenDialog}
          >
            Delete Account
          </Button>
        </ButtonContainer>
      </Profile>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Delete Accont Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you would want to delete you account? This action is
            irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAccount}>Yes</Button>
          <Button onClick={closeDialog}>No</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isSecondDialogOpen}>
        <DialogTitle>Delete Accont Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>{secondDialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRefreshPage}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileSection;
