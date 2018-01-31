import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';


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
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class AdditionalInfo extends React.Component {

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
                            Please provide your following details
                </Typography>
                        <Typography type="subheading" id="simple-modal-description">
                        <center>
                        <TextField
                                id="user_id"
                                label="User id"
                                className={classes.textField}
                                value={localStorage.hasura_id}
                                disabled
                               // onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="email"
                                label="email"
                                className={classes.textField}
                                value={localStorage.email}
                                disabled
                               // onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="name"
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="College"
                                label="College"
                                className={classes.textField}
                                value={this.state.College}
                                onChange={this.handleChange('College')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="semester"
                                label="semester"
                                className={classes.textField}
                                value={this.state.semester}
                                onChange={this.handleChange('semester')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="branch"
                                label="branch"
                                className={classes.textField}
                                value={this.state.branch}
                                onChange={this.handleChange('branch')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="mobile"
                                label="mobile"
                                className={classes.textField}
                                value={this.state.mobile}
                                onChange={this.handleChange('mobile')}
                                margin="normal"
                            />
                            <br/>

                            <Button raised

                            onClick = {()=>{
                                if(this.state.branch && this.state.name && 
                                this.state.mobile && this.state.College 
                                && this.state.semester)
                                this.props.onFilled(this.state)
                                else {
                                    alert('Incomplete Informaiton')
                                }}}

                            style={
                                {
                                    color : 'black',
                                    backgroundColor : 'skyblue'
                                }
                            }
                            > 
                           Submit
                            </Button>
                            </center>

                        </Typography>
                    </div>
                </Modal>
            </center>
        );
    }
}

AdditionalInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AWrapped = withStyles(styles)(AdditionalInfo);

export default AWrapped;