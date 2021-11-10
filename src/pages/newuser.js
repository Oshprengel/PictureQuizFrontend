import React from 'react';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Link, useHistory } from "react-router-dom";
import "../style/login.css"

function NewUser(props) {
  //for redirecting
  let history = useHistory();
  
  ///////////////state//////////////////////
  
  //an error message which is displayed if one is assigned
  const [error, setError] = useState()

  //current state of the form
  const [form, setForm] = useState({
    name:"",
    password:"",
  })

  ///////////////fuctions//////////////////////
  //handle changes within the forum
  const handleChange = (event) =>{
    //for redirecting
    //current forum status
    setForm({...form, [event.target.name]:event.target.value})
  }

  
  //creates a new user if user credentials are valid, if not then direct back to create user page
  const handleNewUser = async (event)=>{
    event.preventDefault()
    //Makes a call to the backend for all users
    const response = await fetch('https://picture-mixture-backend.herokuapp.com/users');
    const data = await response.json();
    console.log("server data", data)
    //loop through all users in backend, if username in form is available then set userNameAvailble to true
    const userNameAvailable = !data.some((currval)=>{
       return currval.name === form.name
    })
    
    //if username is available then add the username to the db
    if (userNameAvailable){
        //encrpyts password
        const formToSend = {
          ...form,
          password:bcrypt.hashSync(form.password, bcrypt.genSaltSync(10))
        }
        //posts new user to backend
        const response = await fetch('https://picture-mixture-backend.herokuapp.com/users', {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(formToSend),
        })
        //once new users is returned set that that the global curruser id in the app 
        const data = await response.json()
        props.setUser(data)
        history.push('/newgame')
    }
    else{
        setError("username is not available")
    }

  }
    return ( 
    <div id="login">
    {error}
    <form onSubmit={handleNewUser}>
        Username<input 
          type="text" 
          name="name" 
          required="required" 
          onChange={handleChange}/>
        Password<input 
          type="password" 
          name="password" 
          required="required"
          onChange={handleChange} />
        <input type="submit" id="submitlogin"/>
    </form>
    <Link to="/">
       <button>Go Back</button>
    </Link>
    </div>
     );
}

export default NewUser;