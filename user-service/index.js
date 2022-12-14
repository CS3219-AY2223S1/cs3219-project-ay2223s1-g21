import express from 'express';
import cors from 'cors';

import { createUser, login, deleteUser, changePassword, refreshToken, requestPasswordReset, resetPassword, getHistory, updateHistory } from './controller/user-controller.js';
import { verifyToken } from './middleware/authJwt.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors()) // this line would enable cors for all cors requests
// app.options('http://127.0.0.1:3000', cors())
app.use(cors({
  origin: process.env.CLIENT_DOMAIN,
  credentials: true
}));

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/signup', createUser)
router.post('/login', login)
router.delete('/delete', [verifyToken], deleteUser)
router.put('/changepassword', [verifyToken], changePassword)
router.get('/refreshtoken', refreshToken)
router.post('/requestPasswordReset', requestPasswordReset)
router.put('/resetPassword', resetPassword)
router.get('/getHistory', [verifyToken], getHistory)
router.put('/updateHistory', [verifyToken], updateHistory)

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json');
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`user-service listening on port ${PORT}`));

export default app;