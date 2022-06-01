import React, { useState } from 'react'
import courseContext from './notesContext'

const port =process.env.PORT || 5000;
const CourseState = (props) => {

  const initial = [
  ]
  const [notes, setnotes] = useState(initial)

  //Get all notes
  const getNote = async(auth) => {
    // console.log("Getting tjhe notes");
    const response = await fetch(`http://thetakebook.herokuapp.com/api/notes/fetchallnotes`, {
      method: 'GET',               
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    const json =await response.json();
    // console.log(json);
    setnotes(json);
  }


  // Add a Note
  const addNote = async (title, description) => {
    // console.log('Adding note');
    const response = await fetch(`http://thetakebook.herokuapp.com/api/notes/insertdata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description})
    });

    const note = response.json();
    setnotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote =async (id) => {
    // console.log('delete using context api id ' + id);
    const response = await fetch(`http://thetakebook.herokuapp.com/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    const json =await response.json();
    // console.log(json);
    setnotes(json);
    const newnotes = notes.filter((note) => { return note._id !== id });
    setnotes(newnotes);
  }

  return (
    <courseContext.Provider value={{ notes, addNote, deleteNote, getNote }}>
      {props.children}
    </courseContext.Provider>

  )
}

export default CourseState;