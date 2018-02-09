import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import PersonIcon from 'material-ui-icons/Person';
import DraftsIcon from 'material-ui-icons/Drafts';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AppBar from './AppBar/AppBar';
import Button from 'material-ui/Button/Button';

const styles = theme => ({
    root: {
        backgroundColor: 'lightgray',
        marginTop: '70px',
       
      
        minHeight: '70vh',

        borderStyle: 'solid',
        borderColor: 'blue',
        padding : '5px'
    },
});

var socket;

class LeaderBoard extends React.Component {

    state = {

        leads: [{
            "score": 6,
            "College": "SSEC",
            "semester": "7th",
            "branch": "CSE",
            "name": "Shivam Kumar Dwivedi",
            "user_id": 27
        }]

    }

    fetchLeads() {

        var t = {
            "type": "select",
            "args": {
                "table": "leads",
                "columns": [
                    "*"
                ],
                "limit": "100"
            }
        }

        socket.emit('querydata', t, (a) => {

            console.log(a)


            if (a.data) {

                this.setState({leads :a.data});


            } else if (a.error) {
                alert('error in fetching leaderboard')
 
            }


        })

    }

    constructor() {
        super();

        socket = window.socket;
    }


    componentWillMount(){
        this.fetchLeads();
    }


    render() {
        const { classes } = this.props;

        if(!localStorage.hasura_token){
           return <center style={{
               marginTop:'100px',
               zIndex:1100
           }}>
              <AppBar time = '11' name= {localStorage.info ? JSON.parse(localStorage.info).name: 'Not logged in'}/>
             
            You have to be logged in to see the leaderboard
             <Button style={
                 {color : 'white'}

                 
             }
             onClick={()=>{

                 window.location.hash = '/login';
                     
                    }}
             > 
                Go to sign in page
            </Button></center>
        }

        return (
            
            <center className={classes.root}>
                <AppBar time = '11' name= {localStorage.info ? JSON.parse(localStorage.info).name: null}/>
                { <h2
                    style={{
                        backgroundColor: '#bdbdbd',
                        paddingTop: '20px',
                        paddingBottom: '10px',
                        margin: '0px'

                    }}

                >Leaderboard</h2> /*
                <List component="nav" style={{
                    textAlign: 'left',
                    minHeight: '60vh',
                    height: 'auto',
                    backgroundColor: 'lightgray',
                    paddingBottom: '10px',
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }}>

                    {this.state.leads.map((val, i) => {

                        return <ListItem button>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <div style={{

                                textShadow: '2px',
                                fontWeight: 'bolder',


                            }} >
                                {
                                    (i+1)  + "   "+val.branch 
                                }

          </div>
                        </ListItem>

                    })}



                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
                <Divider /> */}

                <Paper style={{
                    textAlign: 'left',
                    height: 'auto',
                    backgroundColor: 'lightgray',
                    paddingBottom: '10px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                //    marginRight:'5px',
                    overflowX:'auto'
                }}>
      <Table style={{
                    textAlign: 'left',
                    height: 'auto',
                    backgroundColor: 'lightgray',
                    paddingBottom: '10px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    width:'100%'
                }}>
        <TableHead>
          <TableRow>
          <TableCell>---</TableCell>
            <TableCell>Name</TableCell>
            <TableCell >Score</TableCell>
            <TableCell >College</TableCell>
            <TableCell >Branch</TableCell>
            <TableCell >Semester</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.leads.map((n,i) => {
            return (
              <TableRow key={n.user_id}>
              <TableCell> <b>{++i}</b></TableCell>
                <TableCell> <b>{n.name}</b></TableCell>
                <TableCell >{n.score}</TableCell>
                <TableCell >{n.College}</TableCell>
                <TableCell >{n.branch}</TableCell>
                <TableCell >{n.semester}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>

            </center> 
        );
    }
}
LeaderBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeaderBoard);