
const express = require('express');
const router = express.Router();
const signInController = require('../controller/entry');
const signUpController = require('../controller/entry');

router.get('/signin',signInController.signIn);
router.get('/signup',signUpController.signUp);

router.post('/create',signInController.create)

module.exports = router;

