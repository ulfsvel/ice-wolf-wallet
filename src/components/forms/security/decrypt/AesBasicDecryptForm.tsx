import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {AesBasicDecrypt} from "../../../../types/Wallet";
import {FormState} from "../../../../types/misc";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface AesBasicDecryptFormProps {
    state: FormState
    data: AesBasicDecrypt
    updateWalletDecryptForm: (arg0: 'password') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AesBasicDecryptForm = ({state, data, updateWalletDecryptForm}: AesBasicDecryptFormProps) => {
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

export default AesBasicDecryptForm;