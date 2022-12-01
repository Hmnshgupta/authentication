
const express = require('express');
const router = express.Router();
const signInController = require('../controller/entry');
const signUpController = require('../controller/entry');
const profile = require('../controller/entry')

router.get('/',profile.profile );
router.get('/signin',signInController.signIn);
router.get('/signup',signUpController.signUp);

router.post('/create',signUpController.create);
router.post('/create-session',signInController.createSession)


module.exports = router;

