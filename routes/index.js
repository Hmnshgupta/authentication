
const express = require('express');
const router = express.Router();
const UseController = require('../controller/entry')

const passport =  require('passport');


router.get('/',passport.checkAuthentication,UseController.profile);
router.get('/signin',UseController.signIn);
router.get('/signup',UseController.signUp);
router.get('/home',UseController.home);
router.use('/posts',require('./posts'))
router.use('/comments',require('./comments'));

 router.post('/create',UseController.create);

//use passport as a midddleware for authentication
router.use('/craeteSession',passport.authenticate(
    'local',
    {failureRedirect : '/signin'},
),UseController.craeteSession)

router.use('/signout',UseController.destroySession);


module.exports = router;

