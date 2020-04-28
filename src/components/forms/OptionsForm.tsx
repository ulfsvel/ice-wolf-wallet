import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {UserOptionsForm} from "../../types/User";
import {State} from "../../redux/store"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import UserFormMessage from "../UserFormMessage";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import InfoIcon from '@material-ui/icons/Info';
import {lightBlue} from "@material-ui/core/colors";
import {updateOptionsForm} from "../../redux/actions/users";
import {updateUserThunk} from "../../redux/thunks/users";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
        fontSize: 20,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    snackbar: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: "100%",
        backgroundColor: lightBlue["500"]
    }
}));


interface OptionsFormProps {
    optionsForm: UserOptionsForm
    dispatch: (arg0: any) => void,
}

const OptionsForm = ({optionsForm, dispatch}: OptionsFormProps) => {
    const classes = useStyles();

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateOptionsForm({
            ...optionsForm.data,
            email: event.target.value
        }))
    };

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateOptionsForm({
            ...optionsForm.data,
            password: event.target.value
        }))
    };

    const updatePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateOptionsForm({
            ...optionsForm.data,
            passwordConfirm: event.target.value
        }))
    };

    const optionsUser = () => {
        dispatch(updateUserThunk(optionsForm.data))
    };

    return <Grid container direction={"row"}>
        <SnackbarContent
            className={classes.snackbar}
            message={<span className={classes.message}>
                <InfoIcon className={classes.iconVariant}/>
                Fill only the fields you want to update
            </span>}
        />
        {!!optionsForm.form.message &&
        <UserFormMessage message={optionsForm.form.message} isSuccess={optionsForm.form.isSuccess}/>}
        <TextField
            disabled={optionsForm.form.isSubmitting}
            className={classes.input}
            label={"Email"}
            fullWidth
            variant={"outlined"}
            onChange={updateEmail}
        />
        <TextField
            disabled={optionsForm.form.isSubmitting}
            className={classes.input}
            label={"Password"}
            fullWidth
            variant={"outlined"}
            type={"password"}
            onChange={updatePassword}
        />
        <TextField
            disabled={optionsForm.form.isSubmitting}
            className={classes.input}
            label={"Confirm Password"}
            fullWidth
            variant={"outlined"}
            type={"password"}
            onChange={updatePasswordConfirm}
        />
        <Button
            fullWidth
            disabled={optionsForm.form.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={optionsUser}
        >
            {optionsForm.form.isSubmitting ? <CircularProgress size={24}/> : "Update"}
        </Button>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    optionsForm: state.user.optionsForm
});

export default connect(mapStateToProps)(OptionsForm);