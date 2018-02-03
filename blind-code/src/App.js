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


startGame(e){


  this.setState({
    loading : true,
    loadingText :'Setting up'
  })

  var data = {
    "type": "insert",
    "args": {
        "table": "game",
        "objects": [
            {
                "userId": localStorage.hasura_id,
                "game_key": e.secretKey
            }
        ],
        "returning": [
            "gameid"
        ]
    }
}


//alert(JSON.stringify(data))
  socket.emit('querydata',data,(a)=>{

  if(a.status === 'ok' && a.data.affected_rows === 1)
  {

    this.setState({
      gameid : a.data.returning[0].gameid
    })

  }else{
    alert(JSON.stringify(a));
    window.location.reload();
  }

  this.startTimer();

  this.setState({
    loading : false,
    loadingText :null
  })

 // alert(JSON.stringify(a))

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

     //   alert(JSON.stringify(info))
  }
}

startTimer(){

  this.setState({
      clockTime : this.state.duration
  },()=>{

    setInterval(()=>{

      this.setState({
        clockTime:this.state.clockTime-1
      })}
    ,1000)
  });
  
  

 
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

     //   alert(JSON.stringify(e))

         this.setState({
           problem : e
         },this.startGame(e))
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