import React from "react";
import Grid from "@material-ui/core/Grid";
import Wallet from "../types/Wallet";
import WalletCard from "./WalletCard";

interface WalletListProps {
    wallets: Array<Wallet>
}

const WalletList = ({wallets}: WalletListProps) => {
    return <Grid container direction={"column"}>
        {wallets.map((wallet: Wallet) => (<Grid item key={wallet.publicAddress}>
            <WalletCard wallet={wallet}/>
        </Grid>))}
    </Grid>
};

export default WalletList;