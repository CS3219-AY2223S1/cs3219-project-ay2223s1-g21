import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';

import { createUser, login, logout, deleteUser, changePassword, refreshToken } from './controller/user-controller.js';
import { verifyToken } from './middleware/authJwt.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors()) // FOR PROD: Only allow client domain to access all APIs for security purposes
app.use(
    cookieSession({
      name: "peer-prep-session",
      secret: process.env.COOKIE_SECRET,
      httpOnly: true
    })
  );

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/signup', createUser)
router.post('/login', login)
router.post('/logout', logout)
router.post('/delete', [verifyToken], deleteUser)
router.post('/changepassword', [verifyToken], changePassword)
router.get('/refreshtoken', refreshToken)



app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`user-service listening on port ${PORT}`));