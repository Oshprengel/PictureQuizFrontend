import React from 'react';
import { Link } from 'react-router-dom';
import '../style/main.css'

function Main() {
    return ( 
        <div id="main">
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/newuser">
                <button>Create User</button>
            </Link>
            <Link to="/newgame">
                <button>Play As Guest</button>
            </Link>
        </div>
    );
}

export default Main;