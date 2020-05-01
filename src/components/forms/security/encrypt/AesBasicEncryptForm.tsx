import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import Wallet, {AesBasicEncrypt} from "../../../../types/Wallet";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface AesBasicDecryptFormProps {
    wallet: Wallet
    updateWalletEncryptForm: (arg0: 'password') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AesBasicEncryptForm = ({wallet, updateWalletEncryptForm}: AesBasicDecryptFormProps) => {
    const classes = useStyles();
    const form = wallet.state.changeSecurityType.data.newCredentials as unknown as AesBasicEncrypt;

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

export default AesBasicEncryptForm;