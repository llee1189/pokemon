import React, {useEffect, useState} from "react";
import './App.css';
import Axios from "axios";
import {Link, useNavigate} from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate()

    const [username ,setUsermail] = useState("");
    const [password ,setPassword] = useState("");
    const [error, setError] = useState("");
    
    const [loggedIn, setLoggedIn] = useState(false)
    const [loggedInGuest, setLoggedInGuest] = useState(false)

    const [showWork, setShowWork] = useState(false)


    useEffect(() => {

      if (loggedIn == true) {
        navigate("/game", {
          state: {
            username : username,
            guest : false
          }
        })
      } else if (loggedInGuest == true) {
        navigate("/game", {
          state: {
            username : "",
            guest : true
          }
        })
      }
    }, [loggedIn, loggedInGuest])

    const login = (e) => {
      if (username == "") {setError("Please enter a username."); return}

      Axios.post("https://pokemon-server-zzdv.onrender.com/login", {
        username: username,
      }).then((response) => {
        if (response.data == "BAD") {
          setError("Account does not exist.")
        } else {
          setError("Logging in...")
          setLoggedIn(true)
        }
      })
    }

  return (
    <>
      {showWork 
      ? 
        <>
        <div className="login-background-image">
          <div style={{height:"700px", width: "600px"}} className="login-background-1">
            <div style={{height:"690px", width: "590px"}} className="login-background-2">
              <div style={{height:"665px", width: "565px", textAlign: "center"}} className="login-container" >
              <h1 style={{fontWeight: "normal"}}>How's The Code Work? And then some...</h1>
              <div className="work-text">A mini-game based off the 3rd generational Pokemon game set in Hoenn.</div>
              <div className="work-text">This site uses React.js with 'react-router-dom' and MySQL using Axios, CORS, and Express.</div>
              <div className="work-text">The login and register page are a basic SQL SELECT and INSERT.</div>
              <div className="work-text">The game uses a background image of Hoenn's landscape with buttons overlayed and acting as routes. The pokemons in each area is based off the original spawn rates in the game.</div>
              <div className="work-text">The wild encounter process is done through timeouts and CSS transitions.</div>
              <div className="work-text">All pokemon sprites and cries are pulled in as an outside source, taking away the need to download each individually.</div>
              <div className="work-text">For the Pokedex, when a player first sees a pokemon, that interaction is then logged through MySQL and is reflected through the pokedex by pulling through MySQL as well. Checking if the player has caught the pokemon is done through a similar process.</div>
              <div className="work-text">MySQL is ran on a free-tier of AWS RDS and the Node server is ran for free on Render as well. Due to the free tier constraints, the requests made are much slower than when I ran locally unfortunately, so if certain things seem a little slow, that is the explanation.</div>
              <br/><br/><br/>
              <input type="button" id="work" onClick={() => { setShowWork(false)}} value="Back to Login Page"></input>

              </div>
            </div>
          </div>
          </div>
      </> 
      :       
      <div className="login-background-image">
        <div className="login-background-1">
          <div className="login-background-2">
            <div className="login-container">
              <div className="login-text">Catch 'em All!</div>
              <input className="username-form" id="username-value" type="email" placeholder="Username" onChange={(e) => { { setUsermail(e.target.value) } }} ></input>
              {/* <input className="password-form" type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}></input> */}
              <input className="login-button" type="button" value="Log in" onClick={login} ></input>
              {/* <p className="register" onClick={() => {setShowLoginPage(!showLoginPage)}}>Register</p> */}
              <Link to="/register" className="register">Register</Link>
              <input type="button" className="use-as-a-guest" onClick={() => { setLoggedInGuest(true); login() }} value="Use As A Guest"></input>
              <input type="button" id="work" onClick={() => { setShowWork(true)}} value="How's The Code Work?"></input>

              {error == "" ? <br/> : <div className="exists">{error}</div>}
              <br /> <br /><br /><br /><br /><br />
              <div id="login-comment" > Tip: Log in as "admin" for Mirage Island</div>
            </div>
          </div>
        </div>
      </div>}

    </>
    )

}
