import React from "react";
// import notesContext from '../context/note/notesContext';
import { Link, useNavigate } from "react-router-dom";
import '../Style/Navbar.css';

export default function Navbar() {
    let navigate = useNavigate();
    // const contxt = useContext(notesContext);
    // const { notes, addNote, deleteNote, getNote } = contxt;
    function run() {
        let navcontainer = document.querySelector('.r-list');
        navcontainer.classList.toggle('hide');
    }
    const handleLogout = () => {
            localStorage.removeItem('token');
            navigate('/LogIn');
    }

    return (
        <>
            <div className="nav-Container" >
                <div className="l-list">
                    <div className="navhead">
                        <div className="title">
                            <Link to="/" className="logo"><i class="fa-solid fa-book"></i></Link>
                            <Link to="/" className="tit"><p>The NoteBook</p></Link>
                        </div>
                        <div className="burger" onClick={run}>
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                    </div>
                </div>

                <div className="r-list">
                    <button ><Link to="/"><i class="fa-solid fa-house"></i></Link></button>
                    {!localStorage.getItem('token') ? <div className="logout">
                        <button ><Link to="/LogIn">Log in</Link></button>
                        <button><Link to="/SignUp">Sign up</Link></button>
                    </div> : <button onClick={handleLogout}>Log Out</button>}
                    {/* <button onClick={handleMode}>Dark Mode</button> */}
                </div>
            </div>
        </>
    )
}