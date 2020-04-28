import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import User, {UserResetForm} from "../../types/User";
import {State} from "../../redux/store"
import {connect} from "react-redux";
import {Redirect, useParams} from "react-router-dom"
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import {updateResetForm} from "../../redux/actions/users";
import ResetForm from "../forms/ResetForm";

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 500,
        width: 500,
        margin: theme.spacing(2)
    },
    cardContent: {
        height: "100%"
    },
    fixForWidth: {
        maxWidth: "100%"
    }
}));

interface PasswordResetProps {
    user: User | null
    dispatch: (arg0: any) => void,
    resetForm: UserResetForm
}

const PasswordReset = ({user, resetForm, dispatch}: PasswordResetProps) => {
    const classes = useStyles();
    let {resetToken} = useParams();

    if (user !== null || resetToken === null) {
        return <Redirect to="/"/>
    }

    if (resetForm.data.resetToken === "") {
        dispatch(updateResetForm({
            ...resetForm.data,
            resetToken: resetToken as string
        }))
    }

    return <Grid container justify={"space-evenly"}>
        <Grid item className={classes.card}>
            <Card className={classes.cardContent}>
                <CardContent className={classes.cardContent}>
                    <Grid container direction={"column"} className={classes.cardContent} justify={"space-between"}>
                        <Grid item className={classes.fixForWidth}>
                            <ResetForm/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    user: state.user.appUser,
    resetForm: state.user.resetForm
});

export default connect(mapStateToProps)(PasswordReset);