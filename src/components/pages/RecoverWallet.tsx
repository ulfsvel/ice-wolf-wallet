import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {State} from "../../redux/store"
import {connect} from "react-redux";
import {Redirect, useParams} from "react-router-dom"
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Wallet, {WalletType} from "../../types/Wallet";
import {getWalletType, isRecoveryAvailable} from "../../helpers/wallet";
import RecoverWalletForm from "../forms/security/recoverWallet/RecoverWalletForm";

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

interface RecoverWalletProps {
    dispatch: (arg0: any) => void
    wallets: Record<WalletType, Record<string, Wallet>>
}

const RecoverWallet = ({wallets}: RecoverWalletProps) => {
    const classes = useStyles();
    let {walletTypeString, publicAddress} = useParams();

    if (!walletTypeString) {
        return <Redirect to="/"/>
    }

    const walletType = getWalletType(walletTypeString as string);
    if (!walletType) {
        return <Redirect to="/"/>
    }

    if (!publicAddress) {
        return <Redirect to="/"/>
    }

    const wallet = wallets[walletType as WalletType][publicAddress as string] as Wallet;
    if (!wallet) {
        return <Redirect to="/"/>
    }

    if (!isRecoveryAvailable(wallet.walletSecurityType)) {
        return <Redirect to="/"/>
    }

    return <Grid container justify={"center"}>
        <Grid item className={classes.card}>
            <Card className={classes.cardContent}>
                <CardContent className={classes.cardContent}>
                    <Grid container direction={"column"} className={classes.cardContent} justify={"space-between"}>
                        <Grid item className={classes.fixForWidth}>
                            <Typography variant={"h4"}>
                                Recover Wallet - {wallet.walletType}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.fixForWidth}>
                            <RecoverWalletForm wallet={wallet}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    wallets: state.wallet.wallets
});

export default connect(mapStateToProps)(RecoverWallet);
