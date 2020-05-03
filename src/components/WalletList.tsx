import React from "react";
import Grid from "@material-ui/core/Grid";
import Wallet from "../types/Wallet";
import WalletCard from "./WalletCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    fixWidth: {
        maxWidth: '100%'
    }
});

interface WalletListProps {
    wallets: Array<Wallet>
}

const WalletList = ({wallets}: WalletListProps) => {
    const classes = useStyles();

    return <Grid container direction={"column"} className={classes.fixWidth}>
        {wallets.map((wallet: Wallet) => (<Grid item key={wallet.publicAddress} className={classes.fixWidth}>
            <WalletCard wallet={wallet}/>
        </Grid>))}
    </Grid>
};

export default WalletList;