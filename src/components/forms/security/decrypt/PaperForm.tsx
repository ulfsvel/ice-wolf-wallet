import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Wallet, {PaperTransferFoundsForm} from "../../../../types/Wallet";
import {setWallet} from "../../../../redux/actions/wallet";
import UserFormMessage from "../../../UserFormMessage";
import {State} from "../../../../redux/store";
import Typography from "@material-ui/core/Typography";
import {getCurrencyByWalletType} from "../../../../helpers/wallet";
import {transferFoundsThunk} from "../../../../redux/thunks/wallets";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface PaperFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const PaperForm = ({wallet, dispatch}: PaperFormProps) => {
    const classes = useStyles();
    const form = wallet.state.sendFoundsForm as unknown as PaperTransferFoundsForm;

    const updateWalletDecryptForm = (key: "privateKey" | 'to' | 'amount') => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                sendFoundsForm: {
                    ...wallet.state.sendFoundsForm,
                    data: {
                        ...wallet.state.sendFoundsForm.data,
                        [key]: event.target.value
                    }
                }
            }
        }))
    };


    const submitWalletDecryptForm = () => {
        dispatch(transferFoundsThunk(wallet))
    };

    return <Grid container direction={"row"}>
        {!!wallet.state.sendFoundsForm.state.message &&
        <UserFormMessage message={wallet.state.sendFoundsForm.state.message}
                         isSuccess={wallet.state.sendFoundsForm.state.isSuccess}/>}
        <Typography>
            Details
        </Typography>
        <TextField
            disabled={wallet.state.sendFoundsForm.state.isSubmitting}
            className={classes.input}
            label={"To address"}
            fullWidth
            variant={"outlined"}
            value={form.to}
            onChange={updateWalletDecryptForm('to')}
        />
        <TextField
            disabled={wallet.state.sendFoundsForm.state.isSubmitting}
            className={classes.input}
            label={"Amount in " + getCurrencyByWalletType(wallet.walletType)}
            fullWidth
            type={"number"}
            variant={"outlined"}
            value={form.amount}
            onChange={updateWalletDecryptForm('amount')}
        />
        <Typography>
            Security
        </Typography>
        <TextField
            disabled={wallet.state.sendFoundsForm.state.isSubmitting}
            className={classes.input}
            label={"Private Key"}
            fullWidth
            variant={"outlined"}
            value={form.privateKey}
            onChange={updateWalletDecryptForm('privateKey')}
        />
        <Button
            fullWidth
            disabled={wallet.state.sendFoundsForm.state.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={submitWalletDecryptForm}
        >
            {wallet.state.sendFoundsForm.state.isSubmitting ? <CircularProgress size={24}/> : "Send"}
        </Button>
    </Grid>
};

const mapStateToProps = (state: State) => ({
    loginForm: state.user.loginForm
});

export default connect(mapStateToProps)(PaperForm);