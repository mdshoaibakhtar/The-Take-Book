const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_DECRET = "mdshoaibakhtar1234";
const fetchuser = require('../middleware/fetchuser');
let success = false;
let unique = true;

//ROUTER 1:  Create a user, using : POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
   body('name', "Name should be 3 character").isLength({ min: 3 }),
   body('email', "Please Enter valid email").isEmail(),
   body('password',"password should be minimum 5 character").isLength({ min: 5 }),
], async (req, res) => {

   //Simple Step But Lots Of Problems may Occur
   // const user = User(req.body);
   // user.save();
   // console.log(req.body);
   // res.send(req.body);

   //checking the error, if error is avail.. then we don't need to move forward
   const errors = validationResult(req);
   if (!(errors.isEmpty())) {
      success =false;
      return res.status(400).json({ errors: errors.array() ,success});
   }

   try {
      //checking the email, it is unique or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         unique =false;
         return res.status(400).json({ error: "Try again, with unique Email",unique })
      }

      //bcrypting 
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating the user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass,
      })

      //using .then
      // .then(user => res.json(user)).catch(err => res.status(400).json({ error: 'sahi dalo yrr' }))

      //saving the authentication token to access the data
      const data = {
         user: {
            id: user.id
         }
      }
      const authtoken = jwt.sign(data, JWT_DECRET);
      success = true;
      res.json({success, authtoken });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Error")
   }
})

//ROUTER 2: Authenticate a user using :/api/auth/login. No Login Required
router.post('/login', [
   body('email', "Please Enter valid name").isEmail(),
   body('password', "Please Enter valid password").exists()
], async (req, res) => {
   const errors = validationResult(req);
   if (!(errors.isEmpty())) {
      success =false;
      return res.status(400).json({ errors: errors.array() });
   }

   //using destructure,  to getting the email and password
   const { email, password } = req.body;

   try {
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: "Email Incorrect" });
      }

      //to check the database after checking the email, we have to check db for password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
         success =false;
         return res.status(400).json({success, error: "Inormation Incorrect" });
      }
      const data = {
         user: {
            id: user.id
         }
      }

      const authtoken = jwt.sign(data, JWT_DECRET);
      success = true;
      res.json({success, authtoken });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong")
   }
})

//ROUTER 3 : Fteching the user data after log in using post:"api/auth/getuser".login required(getting the information after getting the token)
router.post('/getuser',fetchuser, async (req, res) => {

   const errors = validationResult(req);
   if (!(errors.isEmpty())) {
      success =false;
      return res.status(400).json({ errors: errors.array() });
   }


   try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      success = true;
      res.send(user);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong")
   }
})



















module.exports = router;