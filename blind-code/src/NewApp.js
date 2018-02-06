import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import io from 'socket.io-client';
import UniversalAppBar from './AppBar/UniversalAppBar';
import App from './App';
import Login from './SignIn';
import Info from './AdditionalInformation';
import Home from './Home';
import LeaderBoard from './LeaderBoard';

const socket = io('https://api.calk49.hasura-app.io');

window.socket =socket;




class NewApp extends React.Component{


  constructor(){
    super();
    socket.on('connect', ()=>{

      console.log(localStorage.getItem("hasura_token"))
  
      socket.emit('settoken' , localStorage.getItem("hasura_token"), (d)=>{console.log(d)});

    });
  }
  
  render(){
 return <Router>
 
    <div style={{
   
    //  overflow : 'hidden'
    }}>

     
      {/* <UniversalAppBar/> */}
      <Route exact path="/" component={Home}/>
      <Route  path="/code" component={App}/>
      <Route path="/login" component={Login}/>
      <Route path="/info" component={Info}/>
      <Route path="/leads" component={LeaderBoard}/>
      <Route exact path="/logout" component={(props)=>{

        localStorage.clear();

        //history.pushState('/home')

        return "logged out";

      }}/>
      


    </div>
    
  </Router>

  
  }
}

export default NewApp