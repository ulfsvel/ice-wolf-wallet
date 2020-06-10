import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {AesBasicEncrypt} from "../../../../types/Wallet";
import {FormState} from "../../../../types/misc";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface AesBasicEncryptFormProps {
    state: FormState
    data: AesBasicEncrypt
    updateWalletEncryptForm: (arg0: 'password') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AesBasicEncryptForm = ({state, data, updateWalletEncryptForm}: AesBasicEncryptFormProps) => {
    const classes = useStyles();

    return <TextField
        disabled={state.isSubmitting}
        className={classes.input}
        label={"Password"}
        fullWidth
        variant={"outlined"}
        type={"password"}
        value={data.password}
        onChange={updateWalletEncryptForm('password')}
    />
};

export default AesBasicEncryptForm;
