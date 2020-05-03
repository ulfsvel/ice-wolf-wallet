import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import {ShamirAdvancedEncrypt} from "../../../../types/Wallet";
import {FormState} from "../../../../types/misc";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface ShamirAdvancedEncryptFormProps {
    state: FormState
    data: ShamirAdvancedEncrypt
    updateWalletEncryptForm: (arg0: 'totalShares' | 'sharesToRebuild') => (event: React.ChangeEvent<HTMLInputElement>) => void
    dispatch: (arg0: any) => void,
}

const ShamirAdvancedEncryptForm = ({state, data, updateWalletEncryptForm}: ShamirAdvancedEncryptFormProps) => {
    const classes = useStyles();

    return <React.Fragment>
        <TextField
            type={"number"}
            disabled={state.isSubmitting}
            className={classes.input}
            label={"Total share"}
            fullWidth
            variant={"outlined"}
            value={data.totalShares}
            onChange={updateWalletEncryptForm('totalShares')}
        />
        <TextField
            type={"number"}
            disabled={state.isSubmitting}
            className={classes.input}
            label={"Shares to rebuild"}
            fullWidth
            variant={"outlined"}
            value={data.sharesToRebuild}
            onChange={updateWalletEncryptForm('sharesToRebuild')}
        />
    </React.Fragment>
};

export default connect()(ShamirAdvancedEncryptForm);