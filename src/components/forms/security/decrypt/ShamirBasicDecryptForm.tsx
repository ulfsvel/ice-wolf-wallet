import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {ShamirBasicDecrypt} from "../../../../types/Wallet";
import {FormState} from "../../../../types/misc";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface ShamirBasicDecryptFormProps {
    state: FormState
    data: ShamirBasicDecrypt
    updateWalletDecryptForm: (arg0: 'password') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ShamirBasicDecryptForm = ({state, data, updateWalletDecryptForm}: ShamirBasicDecryptFormProps) => {
    const classes = useStyles();

    return <TextField
        disabled={state.isSubmitting}
        className={classes.input}
        label={"Password"}
        fullWidth
        variant={"outlined"}
        value={data.password}
        onChange={updateWalletDecryptForm('password')}
    />
};

export default ShamirBasicDecryptForm;