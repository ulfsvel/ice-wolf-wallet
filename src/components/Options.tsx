import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Paper from "@material-ui/core/Paper";
import OptionsForm from "./forms/OptionsForm";
import {logoutUserThunk} from "../redux/thunks/users";

const useStyles = makeStyles((theme: Theme) => ({
    options: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    optionsList: {
        margin: theme.spacing(1),
    },
    formContainer: {
        maxWidth: 500,
        margin: theme.spacing(1)
    }
}));


interface OptionsProps {
    dispatch: (arg0: any) => void,
}

const Options = ({dispatch}: OptionsProps) => {
    const classes = useStyles();

    const handleLogout = () => {
        dispatch(logoutUserThunk())
    };

    return <Paper elevation={2} className={classes.options}>
        <Grid container>
            <Grid item>
                <Paper elevation={2} className={classes.optionsList}>
                    <List>
                        <ListItem selected button>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Edit account"
                            />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Logout"
                            />
                        </ListItem>
                    </List>
                </Paper>
            </Grid>
            <Grid item xs>
                <Grid container justify={"center"}>
                    <Grid item className={classes.formContainer}>
                        <OptionsForm/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
};


export default connect()(Options);