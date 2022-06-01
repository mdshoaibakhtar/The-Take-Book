import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Style/Auth.css'

const port =process.env.PORT || 80;
export default function SignUp() {
    const [signUp, setsignUp] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate();
    const handleChange = (e) => {
        setsignUp({ ...signUp, [e.target.name]: e.target.value });
    }
    const handleSignup = async (e) => {
        const response = await fetch(`http://localhost:${port}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: signUp.name, email: signUp.email, password: signUp.password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            console.log("Congratutalion");
            console.log(json.authtoken);
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        } else {
                alert("Email Should Be Unique");
        }
    }
    return (
        <>
     
          <div className="signUp-container">
                <h1 style={{margin:"1rem 0rem",textAlign:"center"}}>Sign Up</h1>
                <label htmlFor="name"><i class="fa-solid fa-user"> Name</i></label><br />
                <input type="text" id="name" name='name' onChange={handleChange} placeholder="Your Name" required="required"/><br />
                <label htmlFor="email"><i class="fa-solid fa-envelope"> Email</i></label><br />
                <input type="email" id="email" name='email' onChange={handleChange} placeholder="Your Email" /><br />
                <label htmlFor="password"><i class="fa-solid fa-key"> Password</i></label><br />
                <input type="password" id="password" name='password' onChange={handleChange} placeholder="Your Password" /><br />
                <button onClick={handleSignup}><i class="fa-solid fa-arrow-right-to-bracket"> signUp</i></button>
            </div>

        </>
    )
}
