import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {ShamirBasicRecover} from "../../../../types/Wallet";
import {FormState} from "../../../../types/misc";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface ShamirBasicDecryptFormProps {
    state: FormState
    data: ShamirBasicRecover
    updateWalletRecoverForm: (arg0: 'confirmationCode') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ShamirBasicRecoverForm = ({state, data, updateWalletRecoverForm}: ShamirBasicDecryptFormProps) => {
    const classes = useStyles();

    return <TextField
        disabled={state.isSubmitting}
        className={classes.input}
        label={"Confirmation Code"}
        fullWidth
        variant={"outlined"}
        value={data.confirmationCode}
        onChange={updateWalletRecoverForm('confirmationCode')}
    />
};

export default ShamirBasicRecoverForm;
