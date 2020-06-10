import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {State} from "../../redux/store"
import {RequestConfirmTokenForm} from "../../types/User"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import UserFormMessage from "../UserFormMessage";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import {requestConfirmTokenThunk} from "../../redux/thunks/users";

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
    }
}));


interface RequestConfirmTokenFormProps {
    confirmTokenRequestForm: RequestConfirmTokenForm
    dispatch: (arg0: any) => void,
}

const RequestTokenForm = ({confirmTokenRequestForm, dispatch}: RequestConfirmTokenFormProps) => {
    const classes = useStyles();

    const requestToken = () => {
        dispatch(requestConfirmTokenThunk())
    };

    return <Grid container direction={"row"}>
        {!!confirmTokenRequestForm.form.message &&
        <UserFormMessage message={confirmTokenRequestForm.form.message} isSuccess={confirmTokenRequestForm.form.isSuccess}/>}
        <Button
            fullWidth
            disabled={confirmTokenRequestForm.form.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={requestToken}
        >
            {confirmTokenRequestForm.form.isSubmitting ? <CircularProgress size={24}/> : "Request confirm token"}
        </Button>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    confirmTokenRequestForm: state.user.confirmTokenRequestForm
});

export default connect(mapStateToProps)(RequestTokenForm);
