import './App.css';
import Header from "./components/header"
import Footer from './components/footer';
import { Route, Switch } from "react-router-dom";
import { useState } from 'react';
import Main from './pages/main';
import Login from './pages/login'
import NewGame from './pages/newgame'
import NewUser from './pages/newuser';
import LeaderBoard from './pages/leaderboard';

function App() {
  //state
  const [currUser, setUser] = useState(null);
  //___________
  //functions
  //___________

  return (
    <div className="app">
      <Header/>
      <div id="content">
      <Switch>
        <Route exact path="/" >
          <Main/>
        </Route>
        <Route path="/login" >
          <Login setUser={setUser}/>
        </Route>
        <Route path="/newgame" >
          <NewGame currUser ={currUser}/>
        </Route>
        <Route path="/newuser" >
          <NewUser setUser={setUser}/>
        </Route>
        <Route path="/leaderboard">
          <LeaderBoard/>
        </Route>
      </Switch>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
