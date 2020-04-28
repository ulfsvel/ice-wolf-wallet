import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {UserResetForm} from "../../types/User";
import {State} from "../../redux/store"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import UserFormMessage from "../UserFormMessage";
import {updateResetForm} from "../../redux/actions/users";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import {resetUserPasswordThunk} from "../../redux/thunks/users";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface ResetFormProps {
    resetForm: UserResetForm
    dispatch: (arg0: any) => void,
}

const ResetForm = ({resetForm, dispatch}: ResetFormProps) => {
    const classes = useStyles();

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateResetForm({
            ...resetForm.data,
            password: event.target.value
        }))
    };

    const updatePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateResetForm({
            ...resetForm.data,
            passwordConfirm: event.target.value
        }))
    };

    const resetUserPassword = () => {
        dispatch(resetUserPasswordThunk(resetForm.data))
    };

    return <Grid container direction={"row"}>
        {!!resetForm.form.message &&
        <UserFormMessage message={resetForm.form.message} isSuccess={resetForm.form.isSuccess}/>}
        <TextField
            disabled={resetForm.form.isSubmitting}
            className={classes.input}
            label={"Password"}
            fullWidth
            variant={"outlined"}
            type={"password"}
            onChange={updatePassword}
        />
        <TextField
            disabled={resetForm.form.isSubmitting}
            className={classes.input}
            label={"Confirm Password"}
            fullWidth
            variant={"outlined"}
            type={"password"}
            onChange={updatePasswordConfirm}
        />
        <Button
            fullWidth
            disabled={resetForm.form.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={resetUserPassword}
        >
            {resetForm.form.isSubmitting ? <CircularProgress size={24}/> : "Reset"}
        </Button>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    resetForm: state.user.resetForm
});

export default connect(mapStateToProps)(ResetForm);