import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import io from 'socket.io-client';

import App from './App';
import Login from './SignIn';
import Info from './AdditionalInformation';

const socket = io('https://api.calk49.hasura-app.io');

window.socket =socket;

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)



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

      <Route exact path="/code" component={App}/>
      <Route path="/login" component={Login}/>
      <Route path="/info" component={Info}/>
    </div>
  </Router>
  }
}

export default NewApp