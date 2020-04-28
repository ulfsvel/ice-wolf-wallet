import React from "react";
import {State} from "../../redux/store"
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import TabPanel from "../TabPanel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {getWalletsByTypeSelector} from "../../redux/selectors/user";
import Wallet, {WalletType} from "../../types/Wallet";
import WalletList from "../WalletList";
import {makeStyles, Theme} from "@material-ui/core";
import {setWalletTab} from "../../redux/actions/app";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Options from "../Options";

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        width: "100%",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    fixForWidth: {
        maxWidth: "100%"
    }
}));

interface LoginFormProps {
    ethWallets: Array<Wallet>
    btcWallets: Array<Wallet>
    tabIndex: number
    dispatch: (arg0: any) => void
}

const Dashboard = ({ethWallets, btcWallets, tabIndex, dispatch}: LoginFormProps) => {
    const classes = useStyles();

    const handleTabChange = (event: React.ChangeEvent<{}>, tabIndex: number) => {
        dispatch(setWalletTab(tabIndex))
    };

    return <React.Fragment>
        <Grid item className={clsx(classes.card, classes.fixForWidth)}>
            <Paper elevation={2}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="ETH"/>
                    <Tab label="BTC"/>
                    <Tab label="Options"/>
                </Tabs>
            </Paper>
        </Grid>
        <Grid item className={classes.fixForWidth}>
            <Grid container direction={"column"} className={classes.fixForWidth}>
                <TabPanel value={tabIndex} index={0}>
                    <WalletList wallets={ethWallets}/>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <WalletList wallets={btcWallets}/>
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <Options/>
                </TabPanel>
            </Grid>
        </Grid>
    </React.Fragment>
};

const mapStateToProps = (state: State) => ({
    tabIndex: state.app.walletTab,
    ethWallets: getWalletsByTypeSelector(state, WalletType.ETH),
    btcWallets: getWalletsByTypeSelector(state, WalletType.BTC)
});

export default connect(mapStateToProps)(Dashboard);