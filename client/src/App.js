import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import NoteState from './context/note/NoteState';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
export default function App() {
  return (
    <>
      <NoteState>
        < Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/LogIn' element={<LogIn />} />
            <Route exact path='/SignUp' element={<SignUp />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  )
}