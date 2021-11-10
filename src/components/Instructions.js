import React from 'react';
function Instructions(props) {

    return ( 
    <div id ="instructions">
        <h3>1. Enter a search query and press submit</h3>
        <h3>2. Select which images you think are a result of that search query</h3>
        <h3>3. Press submit and see your results</h3>
        <form onSubmit={props.handleSubmit}>
            <input type="text" required="required" onChange={props.handleChange}/>
            <input type="submit"/>
        </form>
        <h4>Correct Picture : <span style={{color:"green"}}>10 points</span></h4>
        <h4>Incorrect Picture : <span style={{color:"red"}}>-5 points</span></h4>
        <h4>Each Second Elapsed : <span style={{color:"red"}}>-1 point</span></h4>
    </div>
         );
}

export default Instructions;