import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Style/Auth.css'


export default function LogIn() {
    const [credential, setCredential] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleLogin = async (e) => {
        console.log("Log In Clicked");
        const response = await fetch('http://localhost:5000/api/auth/login/collaborateurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            console.log("Congratutalion");
            console.log(json.authtoken);
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        } else {
            console.log('bhhag');
            alert("Wrong Details !!!")
        }
    }


    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        } else {
            navigate('/LogIn');
        }
    }, [])

    const handleOnchange = (e) => {
        console.log("Handling On Change");
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="logIn-container">
                <h1 style={{margin:"1rem 0rem",textAlign:"center"}}>Log In</h1>
                <label htmlFor="email"><i class="fa-solid fa-envelope"> Email</i></label><br />
                <input type="email" id="email" placeholder="Your Email" name='email' value={credential.email} onChange={handleOnchange} /><br />
                <label htmlFor="password"><i class="fa-solid fa-key"> Password</i></label><br />
                <input type="password" id="Password" placeholder="Your password" name='password' value={credential.password} onChange={handleOnchange} /><br />
                <button onClick={handleLogin}><i class="fa-solid fa-arrow-right-to-bracket"> logIn</i></button>
               
            </div>
        </>
    )
}
