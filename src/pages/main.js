import React from 'react';
import { Link } from 'react-router-dom';
import '../style/main.css'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Main() {
    return ( 
        <div id="main">
            <Link to="/login">
                <Button 
                    variant="contained"
                    size="large" 
                    endIcon = {<LoginIcon style={{marginLeft: "5px"}}/>}>Login
                </Button>
            </Link>
            <Link to="/newuser">
                <Button 
                    variant="contained"
                    size="large" 
                    endIcon = {<PersonAddAltIcon style={{marginLeft: "5px"}}/>}>Create User
                </Button>
            </Link>
            <Link to="/newgame">
                <Button 
                    variant="contained"
                    size="large" 
                    endIcon = {<PlayArrowIcon style={{marginLeft: "5px"}}/>}>Play As Guest
                </Button>
            </Link>
        </div>
    );
}

export default Main;