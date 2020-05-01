import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import Wallet, {PaperDecrypt} from "../../../../types/Wallet";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface PaperDecryptFormProps {
    wallet: Wallet
    updateWalletDecryptForm: (arg0: 'privateKey') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PaperDecryptForm = ({wallet, updateWalletDecryptForm}: PaperDecryptFormProps) => {
    const classes = useStyles();
    const form = wallet.state.changeSecurityType.data.currentCredentials as unknown as PaperDecrypt;

    return <TextField
        disabled={wallet.state.changeSecurityType.state.isSubmitting}
        className={classes.input}
        label={"Private key"}
        fullWidth
        variant={"outlined"}
        value={form.privateKey}
        onChange={updateWalletDecryptForm('privateKey')}
    />
};

export default PaperDecryptForm;