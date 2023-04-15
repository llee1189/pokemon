import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";
import {Link, useNavigate} from 'react-router-dom'


export const Register = () => {
   
    const navigate = useNavigate()
    const [username ,setUsername] = useState("");
    const [error, setError] = useState("");

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {

      if (loggedIn == true) {
        navigate("/game", {
            state: {
              username : username,
            }
          })
      }
    }, [loggedIn])


    const register = (e) => {
        e.preventDefault();
        // if (username == "" && password == "") {setError("Please enter a username and password."); return}w
        if (username == "") {setError("Please enter a username."); return}
        // if (password =="" ) {setError("Please enter a password."); return}

        alert("If you're visiting the site for the first time in a while, please wait for a few seconds for the server to respond. Unfortunately the perks of a free service.")
        Axios.post("https://pokemon-server-zzdv.onrender.com/register", {
          username: username,
        }).then((response) => {
            if (response.data == "BAD") {
                setError("Username already taken!")
            } else {
                setError("Account created!")
                setLoggedIn(true)
            }
        })
      }

    return (        
        <div className="register-background-image">
            <div className="login-background-1">
                <div className="login-background-2">
                    <div className="login-container">
                        <div className="login-text">Register</div>
                        <input className="username-form" type="email" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}></input>
                        {/* <input className="password-form" type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}></input> */}
                        <input className="login-button" type="button" value="Sign up" onClick={register}></input>
                        <Link to="/" className="register">Already have an account?</Link>
                        <div className="exists">{error}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}