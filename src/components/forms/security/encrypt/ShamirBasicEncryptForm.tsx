import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {ShamirBasicEncrypt} from "../../../../types/Wallet";
import {FormState} from "../../../../types/misc";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface ShamirBasicDecryptFormProps {
    state: FormState
    data: ShamirBasicEncrypt
    updateWalletEncryptForm: (arg0: 'password') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ShamirBasicEncryptForm = ({state, data, updateWalletEncryptForm}: ShamirBasicDecryptFormProps) => {
    const classes = useStyles();

    return <TextField
        disabled={state.isSubmitting}
        className={classes.input}
        label={"Password"}
        fullWidth
        variant={"outlined"}
        value={data.password}
        type={"password"}
        onChange={updateWalletEncryptForm('password')}
    />
};

export default ShamirBasicEncryptForm;
