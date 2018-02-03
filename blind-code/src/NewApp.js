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
 
    <div>
      {/* <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/> */}
      <UniversalAppBar/>
      <Route exact path="/" component={Home}/>
      <Route  path="/code" component={App}/>
      <Route path="/login" component={Login}/>
      <Route path="/info" component={Info}/>
    </div>
  </Router>
  }
}

export default NewApp