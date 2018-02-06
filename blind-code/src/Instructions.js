import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import { CircularProgress,LinearProgress } from 'material-ui/Progress';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '80vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        overflow : 'auto'
    },
});

class Instruction extends React.Component {

    state={
        open : true
    }

    render() {
        const { classes } = this.props;

       

        return (
            <center>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography type="title" id="modal-title">
                        { this.props.text || "Loading" }
                </Typography>
                        <Typography type="subheading" id="simple-modal-description">
                        <center>
                      
                      {
                          this.props.about
                      }
      
                            </center>

                            <Button onClick = {()=>{

                                this.setState({
                                    open : false
                                })
                            }} style={{
                                float : 'right'
                            }} color = "accent"> okay </Button>

                        </Typography>
                    </div>
                </Modal>
            </center>
        );
    }
}

Instruction.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AWrapped = withStyles(styles)(Instruction);

export default AWrapped;