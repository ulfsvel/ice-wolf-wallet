import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import Wallet, {ShamirBasicEncrypt} from "../../../../types/Wallet";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface ShamirBasicDecryptFormProps {
    wallet: Wallet
    updateWalletEncryptForm: (arg0: 'password') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ShamirBasicEncryptForm = ({wallet, updateWalletEncryptForm}: ShamirBasicDecryptFormProps) => {
    const classes = useStyles();
    const form = wallet.state.changeSecurityType.data.newCredentials as unknown as ShamirBasicEncrypt;

    return <TextField
        disabled={wallet.state.changeSecurityType.state.isSubmitting}
        className={classes.input}
        label={"Password"}
        fullWidth
        variant={"outlined"}
        value={form.password}
        onChange={updateWalletEncryptForm('password')}
    />
};

export default ShamirBasicEncryptForm;