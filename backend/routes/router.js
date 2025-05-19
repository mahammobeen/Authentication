const { signup, login } = require('../controller/AUthController');
const { signupValidation, loginValidation } = require('../middleware/AuthValidation');

const router = require('express').Router();

router.post('/login',loginValidation, login)

router.post('/signup', signupValidation, signup)

module.exports = router