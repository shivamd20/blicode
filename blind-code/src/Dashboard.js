
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import bar from './AppBar/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import UniversalAppBar from './AppBar/UniversalAppBar';
import Home from './Home';
import Notification from './Notifications';
import LeaderBoard from './LeaderBoard';
import AddIcon from 'material-ui-icons/Add';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';



const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '60px',
    height : '70%',
    
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <div>

       
      <div className={classes.root}>
             
      <UniversalAppBar
        time = '11' name= {localStorage.info ? JSON.parse(localStorage.info).name: 'Not logged in'}>
        {/* <AppBar position="static" style={{
            backgroundColor : 'darkslategray'
        }}> */}
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Home" />
            <Tab label="LeaderBoard" />
            <Tab label="Notifications"  />
          </Tabs>
        {/* </AppBar> */}
        </UniversalAppBar>
        {value === 0 && <Home/>}
        {value === 1 &&  <LeaderBoard/>}
        {value === 2 && <Notification/>}
      </div>
      
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);