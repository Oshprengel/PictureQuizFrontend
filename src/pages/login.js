import React from 'react';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import bcrypt from 'bcryptjs';
import '../style/login.css'
import { Link } from 'react-router-dom';

function Login(props) {
  //for redirecting
  let history = useHistory();

  //an error message which is displayed if one is assigned
  const [error, setError] = useState()

  //tracks form state
  const [ newForm, setNewForm ] = useState({
    username: "",
    password:""
  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  //function for handling a login
  const handleLogin = async (event)=>{
    event.preventDefault()
    //used for creating username not found error
    let foundUser=false
    //Makes a call to the backend for all users
    const response = await fetch('https://picture-mixture-backend.herokuapp.com/users');
    const data = await response.json();

    console.log(data)

    //loops through each user in backend
    data.forEach((currUser)=>{
        //when username with the same password is found
        if(currUser.name === newForm.username){
            //if form password matches db password
            if(bcrypt.compareSync(newForm.password,currUser.password)){
                props.setUser(currUser)
                history.push('/newgame')
            }else{
            //if password is invalid set error message
            setError("Invalid password")
            }
        }else{
        //if this username doesnt exist
        setError("user does not exist")

        }
    })
  }
    return ( 
    <div id="login">
    {error}
    <form onSubmit={handleLogin}>
        Username<input type="text" name="username" value={newForm.name} onChange={handleChange}/>
        Password<input type="text" name="password"  value={newForm.password} onChange={handleChange}/>
        <input type="submit" id="submitlogin"/>
    </form>
    <Link to="/">
       <button>Go Back</button>
    </Link>
    </div> );
}

export default Login;