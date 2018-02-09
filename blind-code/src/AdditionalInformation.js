import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Loading from './Loading';

var socket;

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
        overflow: 'auto',
        maxHeight: '90vh'
    },
});

class AdditionalInfo extends React.Component {

    constructor() {
        super();
        socket = window.socket;
    }


    checkForAdditionalInfo() {

        this.setState({
            loading: true,
            loadingText: 'Checking your information'
        })

        socket.emit('querydata', {
            "type": "select",
            "args": {
                "table": "user",
                "columns": [
                    "*"
                ],
                "where": {
                    "user_id": {
                        "$eq": localStorage.hasura_id
                    }
                }
            }
        }, (a) => {

            this.setState({
                loading: false,
                loadingText: null
            })

            //  alert(JSON.stringify(a))

            if (a.status == 'ok' && a.data.length === 1) {

                localStorage.info = JSON.stringify({
                    college: a.data[0].college,
                    branch: a.data[0].branch,
                    email: a.data[0].email,
                    mobile: a.data[0].mobile,
                    name: a.data[0].name,
                    semester: a.data[0].semester,
                    additional_info_filled: true
                })

                localStorage.additional_info_filled = true;

                this.props.history.push('/code');
            }
            else if (a.status == 'ok' && a.data.length === 0) {
                // alert(JSON.stringify(a));

            } else {

                localStorage.clear();
                alert(JSON.stringify(a))
                window.location.reload();
            }
        });
    }

    state = {
        name: null,
        College: null,
        mobile: null,
        branch: null,
        semester: null,
        email: localStorage.email,
        user_id: localStorage.hasura_id
    };


    componentWillMount() {

        if (!localStorage.hasura_id) {
            this.props.history.push('/login');
            // return;
        }

        this.checkForAdditionalInfo();
    }

    onAdditionalInfoFilled() {

        const data = this.state;

        this.setState({
            loading: true,
            loadingText: 'Saving your info'
        })

        // alert(JSON.stringify(data))
        socket.emit('querydata', {
            "type": "insert",
            "args": {
                "table": "user",
                "objects": [
                    {
                        "user_id": data.user_id,
                        "email": data.email,
                        "name": data.name,
                        "College": data.College,
                        "mobile": data.mobile,
                        "branch": data.branch,
                        "semester": data.semester,
                    }
                ],
                "returning": [
                    "user_id"
                ],
                " on_conflict ": 'update'
            }
        }, (a) => {

            this.setState({
                loading: false,
                loadingText: null
            })

            if (a.status == 'ok') {

                this.checkForAdditionalInfo();

                //   alert('info successfully saved')

            }
            else if (a.error.code === "postgres-error") {
                alert('data already inserted')
                window.location.reload();
            }
        });

    }


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


        if (this.state.loading)
            return <Loading open={true} text={this.state.loadingText} />;

        return (
            <center>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={true || this.props.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography type="title" id="modal-title">
                            Please provide your following details

                </Typography>
                        <Typography type="subheading" id="simple-modal-description">
                            <center style={{
                                overflow: 'auto',
                                maxHeight: '85vh'
                            }}>

                              
                                <TextField
                                    id="user_id"
                                    label="User id"
                                    className={classes.textField}
                                    value={localStorage.hasura_id}
                                    disabled
                                    // onChange={this.handleChange('name')}
                                    margin="normal"

                                />
                                <br />
                                <TextField
                                    id="email"
                                    label="email"
                                    className={classes.textField}
                                    value={localStorage.email}
                                    disabled
                                    // onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="name"
                                    label="Name"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="College"
                                    label="College"
                                    className={classes.textField}
                                    value={this.state.College}
                                    onChange={this.handleChange('College')}
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="semester"
                                    label="semester"
                                    className={classes.textField}
                                    value={this.state.semester}
                                    onChange={this.handleChange('semester')}
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="branch"
                                    label="branch"
                                    className={classes.textField}
                                    value={this.state.branch}
                                    onChange={this.handleChange('branch')}
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="mobile"
                                    label="mobile"
                                    className={classes.textField}
                                    value={this.state.mobile}
                                    onChange={this.handleChange('mobile')}
                                    margin="normal"
                                />
                                <br />

                                <Button raised

                                    onClick={() => {
                                        if (this.state.branch && this.state.name &&
                                            this.state.mobile && this.state.College
                                            && this.state.semester)
                                            this.onAdditionalInfoFilled()
                                        else {
                                            alert('Incomplete Informaiton')
                                        }
                                    }}

                                    style={
                                        {
                                            color: 'black',
                                            backgroundColor: 'skyblue'
                                        }
                                    }
                                >
                                    Submit
                            </Button>

                            
                            </center>

                            <Button
                                    style={{
                                        color: 'blue',
                                        textAlign: 'right',

                                        float: 'right'
                                    }}

                                    onClick={
                                        () => {

                                            localStorage.clear();
                                            window.location.reload();

                                        }
                                    }
                                >

                                    logout

    </Button>
    <br/>

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