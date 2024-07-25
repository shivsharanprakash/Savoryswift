const express = require('express');
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "thisisprakashshivsharan";
const router = express.Router();

router.post('/createuser',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('password').notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
        body('location').notEmpty().withMessage('Location is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            let secpassword = await bcrypt.hash(req.body.password, salt);

            const user = await User.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.location
            });

            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

router.post('/login',
    [
        body('password').notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ success: false, errors: "Try logging in with correct credentials" });
            }

            const compassword = await bcrypt.compare(req.body.password, user.password);
            if (!compassword) {
                return res.status(400).json({ success: false, errors: "Try logging in with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

module.exports = router;
