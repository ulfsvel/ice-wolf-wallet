import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {UserRegisterForm} from "../../types/User";
import {State} from "../../redux/store"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import UserFormMessage from "../UserFormMessage";
import {updateRegisterForm} from "../../redux/actions/users";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import {registerUserThunk} from "../../redux/thunks/users";

const useStyles = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface RegisterFormProps {
    registerForm: UserRegisterForm
    dispatch: (arg0: any) => void,
}

const LoginForm = ({registerForm, dispatch}: RegisterFormProps) => {
    const classes = useStyles();

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRegisterForm({
            ...registerForm.data,
            email: event.target.value
        }))
    };

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRegisterForm({
            ...registerForm.data,
            password: event.target.value
        }))
    };

    const updatePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRegisterForm({
            ...registerForm.data,
            passwordConfirm: event.target.value
        }))
    };

    const registerUser = () => {
        dispatch(registerUserThunk(registerForm.data))
    };

    return <Grid container direction={"row"}>
        {!!registerForm.form.message &&
        <UserFormMessage message={registerForm.form.message} isSuccess={registerForm.form.isSuccess}/>}
        <TextField
            disabled={registerForm.form.isSubmitting}
            className={classes.input}
            label={"Email"}
            fullWidth
            variant={"outlined"}
            onChange={updateEmail}
        />
        <TextField
            disabled={registerForm.form.isSubmitting}
            className={classes.input}
            label={"Password"}
            fullWidth
            variant={"outlined"}
            type={"password"}
            onChange={updatePassword}
        />
        <TextField
            disabled={registerForm.form.isSubmitting}
            className={classes.input}
            label={"Confirm Password"}
            fullWidth
            variant={"outlined"}
            type={"password"}
            onChange={updatePasswordConfirm}
        />
        <Button
            fullWidth
            disabled={registerForm.form.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={registerUser}
        >
            {registerForm.form.isSubmitting ? <CircularProgress size={24}/> : "Register"}
        </Button>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    registerForm: state.user.registerForm
});

export default connect(mapStateToProps)(LoginForm);