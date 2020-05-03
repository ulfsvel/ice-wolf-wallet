import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {PaperDecrypt} from "../../../../types/Wallet";
import {FormState} from "../../../../types/misc";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface PaperDecryptFormProps {
    state: FormState
    data: PaperDecrypt
    updateWalletDecryptForm: (arg0: 'privateKey') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PaperDecryptForm = ({state, data, updateWalletDecryptForm}: PaperDecryptFormProps) => {
    const classes = useStyles();

    return <TextField
        disabled={state.isSubmitting}
        className={classes.input}
        label={"Private key"}
        fullWidth
        variant={"outlined"}
        value={data.privateKey}
        onChange={updateWalletDecryptForm('privateKey')}
    />
};

export default PaperDecryptForm;