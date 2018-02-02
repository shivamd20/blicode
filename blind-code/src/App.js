import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './AppBar/AppBar';
import CodeArea from './CodeArea/CodeArea';
import ProblemArea from './ProblemArea/ProblemArea';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import { withStyles } from 'material-ui/styles';
import RunResultArea from './RunResultArea';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import lightBlue from 'material-ui/colors/lightBlue';
import Login from './SignIn';
import AdditionalInfo from './AdditionalInformation';
import Loading from './Loading';
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client';
import { dark } from 'material-ui/styles/createPalette';
import AskForSecretKey from './AskForSecretKey';

var socket ;


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

var State={

  email:'email',

  name:'name',
  result:0,
  code: `
  public class Ramu{
    public static void main(String ...args)
      {
       java.util.Scanner sc=new java.util.Scanner(System.in);
       System.out.println(sc.nextInt()+sc.nextInt());
        sc.close();
            }
     }`,
  fileName:'fileName',
  clockTime:0,
  duration:5000,
  input: '1 2',
  fileName: 'Ramu.java',

  language: 'java',
  version: 'latest',
  glotToken:'c5746811-352e-439e-82c8-4ca9dadb0eea',

  hasura_id:0,
 
}
  
class App extends Component {

state={

  ...State,
  error:"",
  stderr:"",
  output:"",

}


 onRun(){

 this.setState({
   running : true,
 })

  var options = {
    url : `https://run.glot.io/languages/${this.state.language}/latest`,
    method : 'post',
    headers : {
      'Authorization': `Token ${this.state.glotToken}`,
      'Content-type': 'application/json'

    },
    data: {
      "files":[{
        "name":this.state.fileName,
        "content":this.state.code
      }],
      'stdin':this.state.input
    },

  }

  socket.emit('proxyrq', options , (d)=>{

    this.setState({
      running : false
    })

    if(d)
    if(d.status)
    if(d.status == "ok"){

      this.setState({
        stderr : d.data.stderr,
        stdout: d.data.stdout,
        error : d.data.error
      })

    }
    console.log(d);
  });

};


startGame(){


  this.setState({
    loading : true,
    loadingText :'Setting up'
  })

  socket.emit('querydata',{
    "type": "select",
    "args": {
        "table": "user",
        "columns": [
            "*"
        ],
        "where": {
            "user_id": {
                "$eq": localStorage.hasura_id
            }
        }
    }
},(a)=>{


  this.startTimer();

  this.setState({
    loading : false,
    loadingText :null
  })

 // alert(JSON.stringify(a))

});
  
}


onSignIn(email,password){

  this.setState({
    loading : true,
    loadingText :'Signing in'
  })

  var options = {
    url : `https://auth.calk49.hasura-app.io/v1/login`,
    method : 'post',
    headers : {
      'Content-type': 'application/json'
    },
    data: {
      "provider" : "email",
      "data" : {
         "email": email,
         "password": password
      }
    },

  }

  socket.emit('proxyrq', options , (d)=>{

    this.setState({
      loading : false,
      loadingText :null
    })

   
   if(d.error)
    {
      alert(JSON.stringify(d.error.message))
      window.location.reload();
    }
    else if (d.data) {
  //    alert('Login Successfull')
      console.log(d.data)



      localStorage.email = email
      localStorage.hasura_token="Bearer "+d.data.auth_token;
      localStorage.hasura_id = d.data.hasura_id;


      socket.emit('settoken' , localStorage.hasura_token, (d)=>{console.log(d)});

      this.setState({
        token :d.data.auth_token,
        email : d.data.email,
        hasura_id : d.data.hasura_id
      }, this.checkForAdditionalInfo())

     
    }
    else{
    alert('unexpected error');
    window.location.reload();
    }

  });

}

onRegister(email,password){

  this.setState({
    loading : true,
    loadingText :'Registering'
  })

  var options = {
    url : `https://auth.calk49.hasura-app.io/v1/signup`,
    method : 'post',
    headers : {
      'Content-type': 'application/json'
    },
    data: {
      "provider" : "email",
      "data" : {
         "email": email,
         "password": password
      }
    },

  }

  socket.emit('proxyrq', options , (d)=>{

    this.setState({
      loading : false,
      loadingText :null
    })
   
   if(d.error)
    {
      alert(JSON.stringify(d.error.message))
    }
    else {
      alert('Email confirmination message has been sent to your email address. It could be in the spam folder.')
      window.location.reload();
    }
  });


}

componentWillMount(){
  
  if(!localStorage.hasura_id){
    this.props.history.push('/login');
  }else if (!localStorage.info){
    this.props.history.push('/info');
  }else {

    let info = JSON.parse(localStorage.info);

    this.setState( {
      college :info.college,
      branch:info.branch,
      email:info.email,
      mobile:info.mobile,
      name:info.name,
      semester:info.semester,
          }
        )

        alert(JSON.stringify(info))
  }
}

startTimer(){

  this.setState(()=>{

    return {
      duration : this.state.clockTime
    }
  })

  setInterval(()=>{

    this.setState({
      clockTime:this.state.clockTime-1
    })}
  ,1000);
}

constructor(props){
  super();

  socket = window.socket;



  // this.checkForAdditionalInfo();

}

  render(props) {

    if(!this.state.problem){
    return  <AskForSecretKey
      onQueLoaded = {(e)=>{

         this.setState({
           problem : e
         })
      }}
      />
    }

    return (
      <div>

      <div >
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"/>
        <AppBar result={this.state.result} name={this.state.name} time = {this.state.clockTime}/>
       
        <div style={{
          marginTop:'70px'
        }}>
      <ExpansionPanel defaultExpanded={true} >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{
          color: 'white',
          backgroundColor:'darkgray'
        }}>
          <Typography ><h1 style={{
          color: 'white',
          fontSize:'large'
        }}>Problem</h1></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{
          color: 'black',
          backgroundColor:'#DCDCDC'
        }}>
          <Typography style={{
          color: 'black',
          backgroundColor:'#DCDCDC'
        }}>

          <ProblemArea
           problem = {this.state.problem.problemDescp} 
           sampleIp = {this.state.problem.sampleIp} 
           sampleOp = {this.state.problem.sampleOp}
           />

          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>


      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}  style={{
          color: 'white',
          backgroundColor:'darkgray'
        }}>
          <Typography ><h2 style={{
            color:'white',
            fontSize:'large'
          }}>Coding Area</h2></Typography>
        </ExpansionPanelSummary>


        <ExpansionPanelDetails style={{
          color: 'white',
          backgroundColor:'gray'
        }}>
          <Typography>
          <CodeArea
          code={this.state.code}
          input={this.state.input}
          language={this.state.language}
          fileName={this.state.fileName}
  

          onLanguageChange={(value)=>{
            this.setState(
              {
                language:value
              }
            )
          }}
          onInputChange={(value)=>{
            this.setState(
              {
                input:value.target.value
              }
            )
          }}
          onFileNameChange={(value)=>{
            this.setState(
              {
                fileName:value.target.value
              }
              
            )
          }}
          onCodeChange={(e)=>{this.setState({
            code:e.target.value
          })}}

          />
          </Typography>
        </ExpansionPanelDetails>
 
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{
          color: 'white',
          backgroundColor:'darkgray'
        }}>

        <h2 style={{fontSize:'large'}}>Compile and Run</h2> 
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{
          color: 'black',
          backgroundColor:'#DCDCDC'
        }}>
        <Typography>
        
        <RunResultArea 
       
        onRun = {this.onRun.bind(this)}

        stdout = {this.state.stdout}
        stderr = {this.state.stderr}
        error = {this.state.error}

        running = {this.state.running}

        />
        </Typography>
      </ExpansionPanelDetails>
      </ExpansionPanel>
      
    </div>
    <footer>
     Shivam Kumar Dwivedi <a href="https://github.com/shivamd20">Fork me on github</a>
        </footer>
      </div>
     
      </div>
    );
  }
}

export default withRouter(App);