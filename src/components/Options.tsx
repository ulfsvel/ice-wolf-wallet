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
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Paper from "@material-ui/core/Paper";
import OptionsForm from "./forms/OptionsForm";
import {logoutUserThunk} from "../redux/thunks/users";
import TabPanel from "./TabPanel";
import {State} from "../redux/store";
import {setOptionsTab} from "../redux/actions/app";
import CreateWalletForm from "./forms/security/createWallet/CreateWalletForm";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
    options: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    paper: {
        margin: theme.spacing(1),
    },
    formContainer: {
        maxWidth: 500,
        width: '100%',
        margin: theme.spacing(1)
    },
    form: {
        padding: theme.spacing(2)
    }
}));


interface OptionsProps {
    tabIndex: number
    dispatch: (arg0: any) => void,
}

const Options = ({tabIndex, dispatch}: OptionsProps) => {
    const classes = useStyles();

    const handleTabClick = (tabIndex: number) => () => {
        dispatch(setOptionsTab(tabIndex))
    };

    const handleLogout = () => {
        dispatch(logoutUserThunk())
    };

    return <Paper elevation={2} className={classes.options}>
        <Grid container alignItems="stretch">
            <Grid item xs={12} sm={'auto'}>
                <Paper elevation={2} className={classes.paper}>
                    <List>
                        <ListItem selected={tabIndex === 0} button onClick={handleTabClick(0)}>
                            <ListItemIcon>
                                <AccountBalanceWalletIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Create wallet"
                            />
                        </ListItem>
                        <ListItem selected={tabIndex === 1} button onClick={handleTabClick(1)}>
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
            <Grid item xs={12} sm>
                <Grid container justify={"center"}>
                    <Grid item className={classes.formContainer}>
                        <Paper elevation={2} className={clsx(classes.paper, classes.form)}>
                            <TabPanel value={tabIndex} index={0}>
                                <CreateWalletForm/>
                            </TabPanel>
                            <TabPanel value={tabIndex} index={1}>
                                <OptionsForm/>
                            </TabPanel>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
};

const mapStateToProps = (state: State) => ({
    tabIndex: state.app.optionsTab,
});

export default connect(mapStateToProps)(Options);