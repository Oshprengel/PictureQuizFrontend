import React, { useState } from 'react';
import '../style/leaderboardstyle.css'

const  LeaderBoard = (props)=>{
    //the currstate of the leaderboard
    let [leaderBoard, updateLeaderBoard] = useState(null)

    //this function refreshes the leadarboard with the most recent data
    const refreshLeaderBoard = async ()=>{
        const response = await fetch('https://picture-mixture-backend.herokuapp.com/games')
        const data = await response.json()
        leaderBoard = data.sort((a,b)=>{
           return (b.points - a.points)
        })
        updateLeaderBoard(data)
    }
    React.useEffect(()=>{
        refreshLeaderBoard()
    },[])
    //if leaderboard is loaded then display it
    if(leaderBoard){
        console.log(leaderBoard)
        return (
            <>
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Search Query</th>
                </tr>
            {leaderBoard.map((e,indx)=>{
                return(
                    <tr>
                        <th>{indx + 1}</th>
                        <th>{e.userName}</th>
                        <th>{e.points}</th>
                        <th>{e.searchQuery}</th>
                    </tr>
                )
            })}
                </table>
            </>
        )
    }else{
    //otherwise return loading
    return <>loading...</>
    }
}

export default LeaderBoard