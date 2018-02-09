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

function FolderList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar>
            <EventNote />
          </Avatar>
          <ListItemText primary="Blind Coding will start from tommorow. Brush up your coding skills. Best of luck" secondary="feb 10, 2018" />
        </ListItem>
        <ListItem>
          <Avatar>
            <EventNote />
          </Avatar>
          <ListItemText primary="Demo keys released. they are 'test' 'test1' 'test3' " secondary="Feb 9, 2018" />
        </ListItem>
        <ListItem>
          <Avatar>
            <EventNote/>
          </Avatar>
          <ListItemText primary="We are inviting you to a scheduled meeting for Blind Coding. Topic: Blind Coding Meetup Time: Feb 10, 2018 6:30 PM India Join from PC, Mac, Linux, iOS or Android: zoom.us/j/504501877 Meeting ID: 504 501 877 " secondary="July 20, 2014" />
        </ListItem>
      </List>
    </div>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);