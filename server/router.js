const { importHouses, getAllHouses, getHouseById, search, postHouse } = require('./controller/houses');
const { getMessages, postMessage } = require('./controller/messages');
const { login, create, logout } = require('./controller/user');
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

//user post their home 
router.post('/dashboard/:id/my-home', postHouse)

//logged user can send messages
router.post('/dashboard/:id/inbox', postMessage)
router.get('/dashboard/:id/inbox', getMessages)


module.exports = router;