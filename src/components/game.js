import React, { useState } from 'react';

function Game(props) {
    //once images are available then map the them into img elements
    let imagesDisplayed = null;
    if (props.images){
    imagesDisplayed = props.images.map((currimg,indx)=>{
        return (
            <img 
            src={currimg.thumbnail} 
            style={(currimg.isSelected) ? {border:"10px solid green"} : {border:"10px solid black"} }
            onClick={props.handleImgSelect}
            key={currimg.indx}
            id={indx.toString()}/>
        )
    })}
    

    //when the game component is rendered make a api search with the given search query
    React.useEffect(()=>{
        //when this component is rendered make a call to the gitimages function from newgame.js
        props.getImages()
     }, [])
    
    //if images are ready to be displayed
    if (imagesDisplayed){
        return (
            <>
                <div id = "images">
                    {imagesDisplayed}
                </div>
                <input type = "submit" id="submitgame" onClick={props.handleGameSubmit}/>
            </>
          )
        }
        else{
            return <h1>Loading</h1>
        }
}

export default Game;