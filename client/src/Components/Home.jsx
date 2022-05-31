import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import '../Style/Home.css';
import notesContext from '../context/note/notesContext';

export default function Home() {
    const contxt = useContext(notesContext);
    const { notes, addNote, deleteNote, getNote } = contxt;
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote()
        } else {
            navigate('/LogIn');
        }
    }, [])

    const [note, setnote] = useState({ title: "", description: "" });

    const handleClick = (e) => {
        addNote(note.title, note.description);
        getNote();
        setnote({ title: "", description: "" })
    }
    const handleChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container">
                <h1>The NoteBook - keep your notes in the cloud</h1>
                <input type="text" className="ntitle" name="title" placeholder="Enter your Title" value={note.title} onChange={handleChange} />
                <textarea name="description" id="note" placeholder="Text Your Note Here" value={note.description} onChange={handleChange} />
                <button className="saveBtn" onClick={handleClick} refresh="true"><i class="fa-solid fa-lg fa-circle-plus"></i></button>
            </div>

            <div className="note-container">
                {notes.map((data) => {
                    return <div className="card" key={data._id}>
                        <div className="card-top">
                            <h1 className="ctitle">{data.title}</h1>
                            <button className="dlt" onClick={() => { deleteNote(data._id) }}><i class="fa-solid fa-2x fa-trash"></i></button>
                        </div>
                        <p>{data.description}</p>
                    </div>
                })}
            </div>
        </>
    )
}