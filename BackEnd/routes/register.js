const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')


router.post('/createuser',
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            
            let user = await User.findOne({email:req.body.email})
            if(user){
                return res.send("Sorry the user with this email is already exist")
            }
            else{

                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(req.body.password,salt)

                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                })

            }
            res.json(user)
            
        } catch (err) {
            console.error(err)
        }
        
    })

module.exports = router