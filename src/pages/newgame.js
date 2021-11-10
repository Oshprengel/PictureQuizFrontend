import React, { useState } from 'react';
import Instructions from '../components/Instructions';
import LeaderBoard from './leaderboard';
import Game from '../components/game';
import randomImageSearch from '../randomimagedata';
import appleData from '../appledata';
import Results from '../components/results';
import '../style/game.css';


function NewGame(props) {
    ////////////////Global Functions/States//////////////////
    //tracks the current phase of the game, 1 = instructions/ 2 = game/3 = results
    const [gameState, updateGameState] = useState(1)
    
    /////////Instruction Phase Functions/States///////////////
    //logs the state of the search query
    const [searchQ, updateSearchQ] = useState()

    //handles a submit within the instructions state, so it loads the midgame with the correct search query
    const handleInstructionSubmit = (event)=>{
        event.preventDefault()
        //change the state of the game to 2 (instructions phase)
        updateGameState(2)
    }
    //update the state of the searchQ state
    const handleInstructionChange = (event)=>{
        updateSearchQ(event.target.value)
    }
    
    ////////////Game Phase Functions/States///////////////
    //the time when the game starts
    const [startTime, updateStartTime] = useState(0)
    //stores all of the correct search results
    const [images, updateImages] = useState()

    //stores an array of the currently selected images
    const [selectedImgs, updateSelectedImgs] = useState([])

    //handles the user selecting an image 
    const handleImgSelect = (event)=>{
        //if the selected image is already selected
        if(images[event.target.id].isSelected){
            //remove the image with the same src as the one within the event
            updateSelectedImgs(selectedImgs.filter((currImg)=>{
                return currImg.thumbnail !== event.target.src
            }))
            //update the images so that the selected image now has iselected set to false
            images[event.target.id].isSelected = false
            updateImages([...images])
        }else{
            //add the event target image to the selected images state by using the id attribute
            updateSelectedImgs(selectedImgs.concat(images[event.target.id]))
            //set the selected images is selected value to true
            images[event.target.id].isSelected = true
            updateImages([...images])
        }
    }

    //function makes a fetch request to get search results according to the users search query
    const getImages = async()=>{
        //fetch search data
        const response = await fetch(`https://app.zenserp.com/api/v2/search?apikey=a2b56c10-36e9-11ec-a509-733b29345fba&q=${searchQ}&tbm=isch`)
        const data = await response.json()
        //add images to this array as objects with a isSearchResult variable
        let displayImages = [];
        //push 4 images that are a result of the search Q into the display images array
        for (let i = 0; i < 4; i++){
            displayImages.splice(Math.floor(Math.random() * displayImages.length),0,{
                thumbnail: data.image_results[i].thumbnail,
                isSearchResult: 'true',
                isSelected: false
            })
        }
        //splice 5 random images into the display images array
        for (let i = 0; i < 5; i++){
            displayImages.splice(Math.floor(Math.random() * displayImages.length),0,{
                thumbnail: randomImageSearch.images_results[(20 * i) + Math.floor(Math.random()*20)].thumbnail,
                isSearchResult: 'false',
                isSelected: false
            })
        }
            updateImages(displayImages)
            //start the timer
            updateStartTime(Date.now)
        }
    
    let [answersCorrect, updateAnswersCorrect] = useState(0);
    let [answersInCorrect, updateAnswersInCorrect] = useState(0)
    let [score, updateScore] = useState(0);
    let [timeElapsed,updateTimeElapsed] = useState(0)

    //handles the game submit
    const handleGameSubmit = ()=>{
        //loops through the selected imgs and logs the correct/incorrect answers to the global vars
        selectedImgs.forEach((currImg)=>{
            if(currImg.isSearchResult === 'false'){
                answersInCorrect += 1 
                updateAnswersInCorrect(answersInCorrect)
            }else{
                answersCorrect += 1 
                updateAnswersCorrect(answersCorrect)
            }

        })

        console.log(answersCorrect, answersInCorrect)
        //this is the time elapsed in seconds
        timeElapsed = parseInt(((Date.now() - startTime) * Math.pow(10, -3)).toString().slice(0,-3))
        updateTimeElapsed(timeElapsed)
        //calculates points
        score = ( 
            answersInCorrect * -5 + 
            answersCorrect * 10 - 
            timeElapsed)
        //prevents the score from being negative
        if(score < 0){
            score = 0
        }
        updateScore(score)
        
        //submit the users game to the backend if user is logged in
        if (props.currUser){
            submitGame({
                userName:props.currUser.name,
                searchQuery:searchQ,
                timeElapsed:timeElapsed,
                points:score
            })
        }
        //switch to final game phase
        updateGameState(3)

    }
    //posts new game to backend if user is logged in
    const submitGame= async(game)=>{
        const response = await fetch('https://picture-mixture-backend.herokuapp.com/games', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(game),
        })
        
    }
    switch (gameState){
    
    //phase 1 (render instruction page)
    case 1:
        return(
            <Instructions
                handleSubmit={handleInstructionSubmit} 
                handleChange={handleInstructionChange}
                />)
    //phase 2 (game)
    case 2:
        return(
            <Game 
                getImages={getImages}
                images={images}
                handleImgSelect={handleImgSelect}
                handleGameSubmit={handleGameSubmit}
                />
        )
    case 3:
        return(
            <Results
                score = {score}
                answersCorrect={answersCorrect}
                answersIncorrect={answersInCorrect}
                timeElapsed={timeElapsed}/>)
    }
}

export default NewGame