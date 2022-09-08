import axios from "axios";

export const handleSignupAccount = (email, password) => {
  const body = {email, password}
  let resultMessage = "";
  axios.post(
    process.env.AUTH_SERVER_URL,   
    body
  ).then(res => resultMessage = res).catch(err => {
    resultMessage = err; 
    
  })
}