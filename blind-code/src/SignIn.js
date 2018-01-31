import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';

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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  

  // handleChange(val){

  //   switch(val){

  //     case 'email': 

  //     this.setState({
  //       email : val
  //     })

  //     break;
  //     case 'pwd': break;
  //     case 'cnfpwd': break;
  //     case 'signin': break;
  //     case 'register': break;
  //     case  'alreadyRegistered' : break;

  //   }



  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
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
      onChange={this.handleChange('email')}
      margin="normal"
    />



    <TextField
      label="password"
      error={this.state.passwordError}
      value={this.state.password}
      onChange={this.handleChange('password')}
      margin="normal"
    />
   { this.state.alreadyRegistered ? "": <TextField
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
          this.props.onLogin(this.state.email,this.state.password)
        }else{

          if(this.state.password !== this.state.cnfPassword){
            alert('Passwords do not match');
            return;
          }
          else if (this.state.password.length <8){

            alert("password is too short");
            return;

          }

          this.props.onRegister(this.state.email,this.state.password);
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

export default wLogin;