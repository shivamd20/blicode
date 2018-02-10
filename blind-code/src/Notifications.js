// Hide the source
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import EventNote from 'material-ui-icons/EventNote';
import WorkIcon from 'material-ui-icons/Work';
import BeachAccessIcon from 'material-ui-icons/BeachAccess';

const styles = theme => ({
  root: {
    width: '100%',
   
    backgroundColor: 'lightgray',
  },
});

class FolderList extends React.Component{

  state = {

      notif:[{
        desc :'Blind Coding will start from tommorow. Brush up your coding skills. Best of luck',
        date : 'feb 10, 2018'
      },
      {
        desc :"Demo keys released. they are 'test' 'test1' 'test3' ",
        date : 'feb 10, 2018'
      },
      {
        desc :"We are inviting you to a scheduled meeting for Blind Coding. Topic: Blind Coding Meetup Time: Feb 10, 2018 6:30 PM India Join from PC, Mac, Linux, iOS or Android: zoom.us/j/504501877 Meeting ID: 504 501 877 ",
        date : 'feb 10, 2018'
      }]
  }

  render(){
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <List>   
          
          {
            this.state.notif.map((data)=>{
            return  <ListItem>
          <Avatar>
            <EventNote />
          </Avatar>
          <ListItemText primary={data.desc} secondary={data.date} />
        </ListItem>

            })
          }

      
      </List>
    </div>
  );
}}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);