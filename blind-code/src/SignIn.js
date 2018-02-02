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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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

class Login extends React.Component {
  state = {
    open: false,
    email: null,
    password: null,
    cnfPassword: null,
    emailError: null,
    passwordError: null,
    cnfPasswordErro: null,
    alreadyRegistered: false
  };

  constructor(){
    super();

    socket = window.socket;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };



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
    }
    else if (d.data) {
     alert('Login Successfull')
      console.log(d.data)

      localStorage.email = email
      localStorage.hasura_token="Bearer "+d.data.auth_token;
      localStorage.hasura_id = d.data.hasura_id;
      
      socket.emit('settoken' , localStorage.hasura_token, (d)=>{console.log(d)});

      this.props.history.push('/info');
     
      
    }
    else{
    alert('unexpected error');
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
      this.setState({
        alreadyRegistered : true
      })
    }
  });


}


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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

         
              <FormControlLabel
              style = {{
              float : 'right',
            }}
          control={
            <Button
              checked={this.state.alreadyRegistered}
              onClick={ ()=>{
                this.setState({
                  alreadyRegistered : !this.state.alreadyRegistered
                })
              } }
              aria-label="Already Registered?"
            > { this.state.alreadyRegistered ? 'Sign up' : 'Log in'  } </Button>
           }
          label=""
        />

<br/>
            <Typography type="title" id="modal-title">
              {this.state.alreadyRegistered ? 'Login' : 'Register'}


            
            </Typography>

            <center>



    <TextField
      label="email"

      value={this.state.email}
      onChange={(e)=>{
        this.setState({
          email : e.target.value.toLowerCase()
        })
      }}

    
      margin="normal"
    />



    <TextField
      label="password"
      type = "password"
      error={this.state.passwordError}
      value={this.state.password}
      onChange={this.handleChange('password')}
      margin="normal"
    />
   { this.state.alreadyRegistered ? "": <TextField
     type = "password"
      label="Confirm Password"
      error={this.state.cnfPasswordErro}
      value={this.state.cnfPassword}
      onChange={this.handleChange('cnfPassword')}
      margin="normal"
    />}

    <br/>
    <Button
    style={{
      color : 'blue'
    }}

    onClick = {
      ()=>{

        if(this.state.alreadyRegistered)
        {
          this.onSignIn(this.state.email,this.state.password)
        }else{

          if(this.state.password !== this.state.cnfPassword){
            alert('Passwords do not match');
            return;
          }
          else if (!this.state.password || this.state.password.length <8){

            alert("password is too short");
            return;

          }

          this.onRegister(this.state.email,this.state.password);
        }
      }
    }
    >
    
    {this.state.alreadyRegistered ? "Login" : "Register"}

    </Button>


  </center>

          </div>
        </Modal>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const wLogin = withStyles(styles)(Login);

export default withRouter(wLogin);