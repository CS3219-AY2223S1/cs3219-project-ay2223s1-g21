import {
  ButtonContainer,
  Divider,
  Container,
  Background,
  Profile,
  ProfileImg,
  ProfileDescription,
  GrpContainer,
  HistoryContainer,
  TransitionButtonContainer
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
import { useEffect, useState, useRef } from "react";
import { setIsLoading } from "../../redux/actions/auth";
import { deleteAccount, getHistory } from "../../services/user_service";
import History from "./History";
import TransitionButton from "../TransitionButton";

const ProfileSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [secondDialogMsg, setSecondDialogMsg] = useState("");
  const { jwtToken, userId, userEmail } = useSelector(
    (state) => state.authReducer
  );
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigateToChangePassword = () => {
    navigate("/change_password");
  };

  useEffect(() => {
    getHistory(jwtToken, userId)
      .then((res) => {
        setData(res.data.history);
      })
      .catch(console.log);
  }, [jwtToken, userId]);

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
        setSecondDialogMsg(res.data.message);
        setIsSecondDialogOpen(true);
      })
      .catch((err) => {
        setSecondDialogMsg(err.response.data.message);
        setIsSecondDialogOpen(true);
      });
    dispatch(setIsLoading(false));
  };

  const handleRefreshPage = () => {
    dispatch(setIsLoading(true));
    setIsSecondDialogOpen(false);
    dispatch(setIsLoading(false));
    window.location.reload();
  };
  const profileRef = useRef();
  const historyRef = useRef();
  const btnRef = useRef();
  const [isProfile, setIsProfile] = useState(true);
 
  const handleToggle = () => {
    if (isProfile) {
      profileRef.current.style.left = "-200%";
      historyRef.current.style.left = "50%";
      btnRef.current.style.left = "110px";
    } else {
      profileRef.current.style.left = "50%";
      historyRef.current.style.left = "200%";
      btnRef.current.style.left = "0px";
    }
    setIsProfile(!isProfile)
  }

  return (
    <Container id="home">
      <Background />
      <TransitionButtonContainer>
        <TransitionButton
          name1={"Profile"}
          name2={"History"}
          handleToggle={handleToggle}
          btnRef={btnRef}
        />
      </TransitionButtonContainer>

      <GrpContainer>
        <Profile ref={profileRef}>
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
        <HistoryContainer ref={historyRef}>
          <History rows={data} />
        </HistoryContainer>
      </GrpContainer>

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
        <DialogTitle>Delete Acccont Notification</DialogTitle>
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
