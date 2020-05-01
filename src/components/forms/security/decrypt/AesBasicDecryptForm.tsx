import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import Wallet, {AesBasicDecrypt} from "../../../../types/Wallet";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface AesBasicDecryptFormProps {
    wallet: Wallet
    updateWalletDecryptForm: (arg0: 'password') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AesBasicDecryptForm = ({wallet, updateWalletDecryptForm}: AesBasicDecryptFormProps) => {
    const classes = useStyles();
    const form = wallet.state.changeSecurityType.data.currentCredentials as unknown as AesBasicDecrypt;

    return <TextField
        disabled={wallet.state.changeSecurityType.state.isSubmitting}
        className={classes.input}
        label={"Password"}
        fullWidth
        variant={"outlined"}
        value={form.password}
        onChange={updateWalletDecryptForm('password')}
    />
};

export default AesBasicDecryptForm;