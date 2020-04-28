import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {UserLoginForm} from "../../types/User";
import {State} from "../../redux/store"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import UserFormMessage from "../UserFormMessage";
import {updateLoginForm} from "../../redux/actions/users";
import {loginUserThunk} from "../../redux/thunks/users";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface LoginFormProps {
    loginForm: UserLoginForm
    dispatch: (arg0: any) => void,
}

const LoginForm = ({loginForm, dispatch}: LoginFormProps) => {
    const classes = useStyles();

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateLoginForm({
            ...loginForm.data,
            email: event.target.value
        }))
    };

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateLoginForm({
            ...loginForm.data,
            password: event.target.value
        }))
    };

    const loginUser = () => {
        dispatch(loginUserThunk(loginForm.data))
    };

    return <Grid container direction={"row"}>
        {!!loginForm.form.message &&
        <UserFormMessage message={loginForm.form.message} isSuccess={loginForm.form.isSuccess}/>}
        <TextField
            disabled={loginForm.form.isSubmitting}
            className={classes.input}
            label={"Email"}
            fullWidth
            variant={"outlined"}
            onChange={updateEmail}
        />
        <TextField
            disabled={loginForm.form.isSubmitting}
            className={classes.input}
            label={"Password"}
            fullWidth
            variant={"outlined"}
            type={"password"}
            onChange={updatePassword}
        />
        <Button
            fullWidth
            disabled={loginForm.form.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={loginUser}
        >
            {loginForm.form.isSubmitting ? <CircularProgress size={24}/> : "Login"}
        </Button>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    loginForm: state.user.loginForm
});

export default connect(mapStateToProps)(LoginForm);