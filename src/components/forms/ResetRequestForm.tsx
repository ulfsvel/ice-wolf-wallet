import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {UserResetRequestForm} from "../../types/User";
import {State} from "../../redux/store"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import UserFormMessage from "../UserFormMessage";
import {updateResetRequestForm} from "../../redux/actions/users";
import {resetUserPasswordRequestThunk} from "../../redux/thunks/users";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface ResetFormProps {
    resetRequestForm: UserResetRequestForm
    dispatch: (arg0: any) => void,
}

const ResetRequestForm = ({resetRequestForm, dispatch}: ResetFormProps) => {
    const classes = useStyles();

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateResetRequestForm({
            ...resetRequestForm.data,
            email: event.target.value
        }))
    };

    const loginUser = () => {
        dispatch(resetUserPasswordRequestThunk(resetRequestForm.data))
    };

    return <Grid container direction={"row"}>
        {!!resetRequestForm.form.message &&
        <UserFormMessage message={resetRequestForm.form.message} isSuccess={resetRequestForm.form.isSuccess}/>}
        <TextField
            disabled={resetRequestForm.form.isSubmitting}
            className={classes.input}
            label={"Email"}
            fullWidth
            variant={"outlined"}
            onChange={updateEmail}
        />
        <Button
            fullWidth
            disabled={resetRequestForm.form.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={loginUser}
        >
            {resetRequestForm.form.isSubmitting ? <CircularProgress size={24}/> : "Reset password"}
        </Button>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    resetRequestForm: state.user.resetRequestForm
});

export default connect(mapStateToProps)(ResetRequestForm);