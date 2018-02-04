import './AppBar.css';
import Opponents from './Opponents/Opponents';
import Time from './Time/Time';


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  //   render(){

  //             return <header className="AppBar">
  //             <Opponents/>
  //             <center class="title">CodeChamp</center>
  //             <Time/>
  //             </header>;
  //         }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>

        <AppBar position="fixed"
          style={
            {
              top: 0
            }
          }
          title="Blind Coding"
        >
          <Toolbar style={{
            'background-color': 'darkslategray',
            textAlign: 'center'
          }
          }>



            {/* <IconButton className={classes.menuButton}  aria-label="Menu">
              <MenuIcon />
            </IconButton> */}

            <Opponents score={this.props.score} name={this.props.name} />
            <Typography type="title" color="inherit" className={classes.flex}>

              <div className={classes.root}>

              </div>
              Blind Coding
            </Typography>

            <Time time={this.props.time} />

            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="contrast"
                >
                  <AccountCircle />
                </IconButton>


                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={

                    () => {}
                  }>Profile</MenuItem>
                  <MenuItem onClick={() => {

                    localStorage.clear();
                    window.location.reload();

                  }}>Logout</MenuItem>
                </Menu>

              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);

