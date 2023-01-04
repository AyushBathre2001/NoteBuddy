const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const { findOne } = require('../models/UserModel');
let jwt_secret = "hellomynameisayushhowareyou"

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

            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.send("Sorry the user with this email is already exist")
            }
            else {

                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(req.body.password, salt)

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

router.post('/login',
    body('email').isEmail(),
    body('password').exists(),
     async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let {email,password} = req.body
        try {
            let user = await User.findOne({email})
            if(!user){
               return res.status(400).send("Please try to enter correct login credentials")
            }
            let passcompare = await bcrypt.compare(password,user.password)
            if(!passcompare){
                return res.status(400).send("Please try to enter correct login credentials")
            }

            let data = {
                user:{
                    id:user.id
                }
            }
            var token = jwt.sign(data, jwt_secret);

            res.send(token)
            
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    })

router.post('/getuser',fetchuser, async(req,res)=>{

    
    try {
        const userid = req.user.id
        const user = await User.findById(userid).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})



module.exports = router