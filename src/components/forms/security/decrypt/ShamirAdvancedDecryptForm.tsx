import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import Wallet, {ShamirAdvancedDecrypt} from "../../../../types/Wallet";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
    box: {
        width: "100%"
    },
    boxButton: {
        marginRight: theme.spacing(2)
    },
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface ShamirAdvancedDecryptFormProps {
    wallet: Wallet
    updateWalletDecryptFormShares: (arg0: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
    addWalletDecryptFormShare: () => void
    removeWalletDecryptFormShare: () => void
    dispatch: (arg0: any) => void,
}

const ShamirAdvancedDecryptForm = ({wallet, updateWalletDecryptFormShares, addWalletDecryptFormShare, removeWalletDecryptFormShare}: ShamirAdvancedDecryptFormProps) => {
    const classes = useStyles();
    const form = wallet.state.changeSecurityType.data.currentCredentials as unknown as ShamirAdvancedDecrypt;

    return <React.Fragment>
        <Box className={clsx(classes.box, classes.input)}>
            <Button
                disabled={wallet.state.sendFoundsForm.state.isSubmitting}
                className={classes.boxButton}
                variant="contained"
                component="label"
                color={"primary"}
                onClick={removeWalletDecryptFormShare}
            >
                Remove Share
            </Button>
            <Button
                disabled={wallet.state.sendFoundsForm.state.isSubmitting}
                variant="contained"
                component="label"
                color={"primary"}
                onClick={addWalletDecryptFormShare}
            >
                Add Share
            </Button>
        </Box>
        {form.shares.map((share: string, key: number) => (
            <TextField
                key={key}
                disabled={wallet.state.sendFoundsForm.state.isSubmitting}
                className={classes.input}
                label={"Share " + key}
                fullWidth
                variant={"outlined"}
                value={share}
                onChange={updateWalletDecryptFormShares(key)}
            />
        ))}
    </React.Fragment>
};

export default connect()(ShamirAdvancedDecryptForm);