const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTER 1 :adding the cousre using post: "/api/course/insertdata/" : login req
router.post('/insertdata', fetchuser, [
   body('title', "Please Enter title").isLength({ min: 5 }),
   body('description', "Please Enter Description")
], async (req, res) => {

   const { title, description } = req.body;
   const errors = validationResult(req);
   if (!(errors.isEmpty())) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const notes = new Notes({
         title, description, user: req.user.id
      })
      const savedNotes = await notes.save();
      res.json(savedNotes);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong")
   }


})


//ROUTER 2 :  get all the course using get : login req
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   const notes = await Notes.find({ user: req.user.id });
   res.json(notes);
})

//ROUTER 3 : delete the course : login req
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
   try {
      let notes = await Notes.findById(req.params.id);
      if (!notes) {
         return res.status(401).send("Not allowed");
      }
      notes = await Notes.findOneAndDelete(req.params.id);
      res.json({ "Success": "Deleted" })
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong")
   }
})

module.exports = router;