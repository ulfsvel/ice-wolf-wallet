import React from "react";
import {makeStyles} from "@material-ui/core";
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

const useStyles = makeStyles(theme => ({
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
                        Disclaimer
                    </Typography>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat nulla fringilla
                        neque volutpat porta. Nunc posuere, libero id venenatis imperdiet, magna magna pulvinar lectus,
                        non lacinia augue orci vel sapien. In a viverra massa. Mauris ultrices, libero non dapibus
                        hendrerit, enim tellus aliquet odio, sit amet porta urna sem et tortor. Pellentesque sagittis
                        condimentum augue in tincidunt. Cras sed sapien a ipsum auctor pulvinar et eget ipsum. Fusce vel
                        orci malesuada, pretium urna convallis, lacinia lacus. Aenean risus urna, interdum ac viverra
                        sed, commodo ut nisl. Quisque elit urna, volutpat vel lobortis non, egestas nec leo. Sed
                        consectetur sed augue vel egestas.
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