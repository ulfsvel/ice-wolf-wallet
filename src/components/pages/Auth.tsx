import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import User from "../../types/User";
import {State} from "../../redux/store"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import ResetForm from "../forms/ResetRequestForm";
import TabPanel from "../TabPanel";
import {setAuthTab} from "../../redux/actions/app";

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

interface LandingProps {
    user: User | null
    tabIndex: number
    dispatch: (arg0: any) => void
}

const Auth = ({user, tabIndex, dispatch}: LandingProps) => {
    const classes = useStyles();
    const year = new Date().getFullYear();

    const handleTabChange = (event: React.ChangeEvent<{}>, tabIndex: number) => {
        dispatch(setAuthTab(tabIndex));
    };

    if (user !== null) {
        return <Redirect to="/"/>
    }


    return <Grid container justify={"space-evenly"}>
        <Grid item className={classes.card}>
            <Card>
                <CardContent>
                    <Typography variant={"h4"}>
                        Copyright & Disclaimer
                    </Typography>
                    <Typography>
                        Copyright (C) {year} Botici Alexandru
                        <br/>
                        This program is free software: you can redistribute it and/or modify
                        it under the terms of the GNU General Public License as published by
                        the Free Software Foundation, either version 3 of the License, or
                        (at your option) any later version.
                        <br/>
                        This program is distributed in the hope that it will be useful,
                        but WITHOUT ANY WARRANTY; without even the implied warranty of
                        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
                        GNU General Public License for more details.
                        <br/>
                        You should have received a copy of the GNU General Public License
                        along with this program. If not, see <a
                        href={"https://www.gnu.org/licenses/"}>https://www.gnu.org/licenses/</a>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item className={classes.card}>
            <Card className={classes.cardContent}>
                <CardContent className={classes.cardContent}>
                    <Grid container direction={"column"} className={classes.cardContent} justify={"space-between"}>
                        <Grid item className={classes.fixForWidth}>
                            <Typography variant={"h4"}>
                                Welcome to IW2
                            </Typography>
                        </Grid>
                        <TabPanel value={tabIndex} index={0} className={classes.fixForWidth}>
                            <LoginForm/>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1} className={classes.fixForWidth}>
                            <RegisterForm/>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={2} className={classes.fixForWidth}>
                            <ResetForm/>
                        </TabPanel>
                        <Grid item className={classes.fixForWidth}>
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab label="Login"/>
                                <Tab label="Register"/>
                                <Tab label="Reset Password"/>
                            </Tabs>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    user: state.user.appUser,
    tabIndex: state.app.authTab
});

export default connect(mapStateToProps)(Auth);
