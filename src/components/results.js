import React from 'react';
import { Link } from 'react-router-dom';

function Results(props) {
    return ( 
    <>
        <h1>Score : {props.score} </h1>
        <h3>Seconds Elapsed : {props.timeElapsed} </h3>
        <h3>Answers Correct : {props.answersCorrect} </h3>
        <h3>Answers Incorrect : {props.answersIncorrect} </h3>
        <Link to="/leaderboard">
            <button>Go To Leaderboard</button>
        </Link>
        <Link to="/">
            <button>Play Again</button>
        </Link>
    </> );
}

export default Results;