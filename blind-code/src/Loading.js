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
        width: 310,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class Loading extends React.Component {

    state = {
        name: null,
        College: null,
        mobile: null,
        branch: null,
        semester: null,
        email : localStorage.email,
        user_id : localStorage.hasura_id
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <center>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography type="title" id="modal-title">
                        { this.props.text || "Loading" }
                </Typography>
                        <Typography type="subheading" id="simple-modal-description">
                        <center>
                       
                        <CircularProgress
                        // className={classes.progress} 
                        style={{ color: 'green' }} thickness={7} size = {200} />
                    
                <LinearProgress
                        // className={classes.progress} 
                        style={{ color: 'green' }} thickness={7} size = {200} />
                            </center>

                        </Typography>
                    </div>
                </Modal>
            </center>
        );
    }
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AWrapped = withStyles(styles)(Loading);

export default AWrapped;