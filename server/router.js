const { createChat, userChats } = require('./controller/chat');
const { importHouses, getAllHouses, getHouseById, search, postHouse, getUserHouse } = require('./controller/houses');
const { getMessages, addMessage } = require('./controller/messages');
const { login, create, logout, getUser } = require('./controller/user');
const authMiddleware = require('./middlewares/auth');

const router = require('express').Router();

router.post('/', importHouses)

//all uses can see all houses
router.get('/', getAllHouses)

//all users can see all houses details
router.get('/:id', getHouseById)

//all users cna see all filtered houses //TODO
// router.get('/search', search)

//user login
router.post('/login', login)
//user sign up
router.post('/signup', create)
//user logout
router.post('/logout', authMiddleware, logout)


router.get('/user/:id', getUser)

//user can post their home 
router.post('/dashboard/my-home', postHouse)
router.get('/dashboard/:id', getUserHouse)

//logged user can see all the chat
router.get('/inbox/:id', userChats)
router.post('/inbox', createChat)

//user can go into specific chat and send and get all messages
router.post('/message', addMessage)
router.get('/message/:chatId', getMessages)


module.exports = router;