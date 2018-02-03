import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import { withRouter } from 'react-router-dom'
import Loading from './Loading'


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

var socket;

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    overflow : 'scroll',
  },
});

class AskForSecretKey extends React.Component {
 
  constructor(){
    super();

    socket = window.socket;
  }

  state = {}

  checkSecretKey(key){

    var t= {
     "type": "select",
     "args": {
         "table": "game_set",
         "columns": [
             "*",
             {
                 "name": "game_set-problem",
                 "columns": [
                     "*"
                 ]
             }
         ],
         "where": {
             "game_id": {
                 "$eq": key || this.state.secretKey
             }
         },
         "limit": "1"
     }
   }
   
   this.setState({
     loading : true,
     loadingText :'Checking your secret key'
   })
   
   socket.emit('querydata',t,(a)=>{
   
   
   
   this.setState({
     loading : false,
     loadingText :null
   })
   
   if(a.error){
     alert('There is some error. Please refresh this page');
     return
   }
   else if(a.data.length === 0){
   
     this.setState({
       error : 'invalid secret key'
     })
     
   }else {

    var b = {
       sampleIp : a.data[0]['game_set-problem'].sameIp,
       problemId : a.data[0]['game_set-problem'].problem_id,
       sampleOp : a.data[0]['game_set-problem'].sampleop,
       problemDescp : a.data[0]['game_set-problem'].description,
       game_about : a.data[0].about,
       duration : a.data[0].duration,
       secretKey : a.data[0].game_id
     };
     this.props.onQueLoaded(b)
   }

   
   });
   }
  
  render() {
    const { classes } = this.props;

     if(this.state.loading)
      return <Loading open= {true} text = {this.state.loadingText}/>;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={true || this.props.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>

<br/>
            <Typography type="title" id="modal-title">
              
              Enter you Secret key

            </Typography>

            <center>


    <TextField
      label= { this.state.error || "Secret Key" }
    //  type = "password"
      error={this.state.error}
      value={this.state.password}
      onChange={(e)=>{
          this.setState({
              secretKey : e.target.value
          })

      }}
      margin="normal"
    />
  

    <br/>
    <Button
    style={{
      color : 'blue'
    }}

    onClick = {
      ()=>{

        if(!this.state.secretKey){
            this.setState({
                error : "invalid key"
            })
        }else {
            this.checkSecretKey();
        }

      }
    }
    >
    
    Submit 

    </Button>


  </center>

          </div>
        </Modal>
      </div>
    );
  }
}

AskForSecretKey.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const wAskForSecretKey = withStyles(styles)(AskForSecretKey);

export default withRouter(wAskForSecretKey);