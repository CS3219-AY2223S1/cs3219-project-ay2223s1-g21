import axios from "axios";

export const handleCreateNewAccount = async (email, password) => {
  const body = {email, password}
  let statusCode = ""
  let message = ""
  const CREATE_ACCOUNT_ENDPOINT = process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/signup";
  console.log("request sent for create new acc");
  await axios.post(
    CREATE_ACCOUNT_ENDPOINT,   
    body
  ).then(res => {
    statusCode = res.status
    message = res.data.message
  }).catch(err => {
    statusCode = err.response.status
    message = err.response.data.message
    console.log("Account creation error, " + err)
  })

  return {statusCode, message}
}


export const handleLogin = async (email, password) => {
  const LOG_IN_ENDPOINT = process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/login";
  const body = {email, password};
  let statusCode = ""
  let id = ""
  let emailResponse = ""
  console.log("request sent");
  
  await axios.post(
    LOG_IN_ENDPOINT,   
    body
  ).then(res => {
    statusCode = res.status
    emailResponse = res.data.email
    id = res.data.id
    console.log("login response OK")
  }).catch(err => {
    statusCode = err.response.status
    console.log("Login error, " + err)
  })

  return {statusCode, emailResponse, id}
}