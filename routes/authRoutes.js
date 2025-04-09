import express from 'express';
import {register, login} from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../utils/validators.js';
import { validationResult } from 'express-validator';

const router = express.Router();

const validate = (validator) =>[
    ...validator,
    (req, res, next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
            next()
    
    }
]

router.route('/register').post(validate(registerValidator), register);
router.route('/login').post(validate(loginValidator),login);

export default router;