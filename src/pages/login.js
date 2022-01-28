import React from 'react';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import bcrypt from 'bcryptjs';
import '../style/login.css'
import { Link } from 'react-router-dom';
import {TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Login(props) {
  //for redirecting
  let history = useHistory();

  // an error code which pertains to login errors
  // false = no error
  // 1 = incorrect username
  // 2 = incorrect password
  const [error, setError] = useState(false)

  //tracks form state
  const [ newForm, setNewForm ] = useState({
    username: "",
    password:""
  });

  //determines whether loading icon is shown
  const [loading, setLoading] = useState(false)

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  //function for handling a login
  const handleLogin = async (event)=>{
    event.preventDefault()
    //makes the loading icon render
    setLoading(true)

    //Makes a call to the backend for all users
    const response = await fetch('https://picture-mixture-backend.herokuapp.com/users');
    const data = await response.json();
    
    //set the error to invalid username, if invalid password instead then this will be reset inside following loop
    setError(1)
    //loops through each user in backend
    data.forEach((currUser)=>{
        //when matching username is found
        if(currUser.name === newForm.username){
            //if form password matches db password
            if(bcrypt.compareSync(newForm.password,currUser.password)){
                props.setUser(currUser)
                history.push('/newgame')
            }else{
            //if password is invalid set error message
            setError(2)
            console.log("setting 2")
            setLoading(false)
            return
            }
        }
    })
    setLoading(false)
  }

  //determines whether password is visible or not
  const [showPassword, setShowPassword] = useState(false)

  //handles clicks on password visibility icon
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(showPassword)
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return ( 
    <div id="login">
      <form onSubmit={handleLogin} id = "login-form">
          <TextField
            error = {error == 1}
            // {error == 1 : helperText="hello" ? null}
            helperText = {error == 1 ? "Invalid username" : ""}
            className="textfield" 
            id="username" 
            label="Username" 
            variant="outlined" 
            name="username"value={newForm.name} 
            onChange={handleChange}
            InputProps = {{
              endAdornment:(
                <PersonOutlineIcon/>
                ) 
              }}
          />
          <TextField
            error = {error == 2} 
            helperText = {error == 2 ? "Invalid password" : ""}
            id="password" 
            label="Password" 
            variant="outlined" 
            name="password" value={newForm.password} 
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            InputProps = {{
              endAdornment:(
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ) 
              }}
          />
          <LoadingButton 
            variant="outlined" 
            type ="submit"
            loadingPosition ="end"
            loading = {loading}
            endIcon = {<LoginIcon/>}
            >Login</LoadingButton>
          <Link to="/">
            <Button 
              variant="contained" 
              startIcon = {<ArrowBackIcon/>}>Go Back</Button>
          </Link>
      </form>
    </div> );
}

export default Login;