import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import Wallet, {ShamirAdvancedEncrypt} from "../../../../types/Wallet";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface ShamirAdvancedEncryptFormProps {
    wallet: Wallet
    updateWalletEncryptForm: (arg0: 'totalShares' | 'sharesToRebuild') => (event: React.ChangeEvent<HTMLInputElement>) => void
    dispatch: (arg0: any) => void,
}

const ShamirAdvancedEncryptForm = ({wallet, updateWalletEncryptForm}: ShamirAdvancedEncryptFormProps) => {
    const classes = useStyles();
    const form = wallet.state.changeSecurityType.data.newCredentials as unknown as ShamirAdvancedEncrypt;

    return <React.Fragment>
        <TextField
            disabled={wallet.state.changeSecurityType.state.isSubmitting}
            className={classes.input}
            label={"Total share"}
            fullWidth
            variant={"outlined"}
            value={form.totalShares}
            onChange={updateWalletEncryptForm('totalShares')}
        />
        <TextField
            disabled={wallet.state.changeSecurityType.state.isSubmitting}
            className={classes.input}
            label={"Shares to rebuild"}
            fullWidth
            variant={"outlined"}
            value={form.sharesToRebuild}
            onChange={updateWalletEncryptForm('sharesToRebuild')}
        />
    </React.Fragment>
};

export default connect()(ShamirAdvancedEncryptForm);