import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Wallet, {PaperSecurityResult, ShamirAdvancedSecurityResult, WalletSecurityType} from "../../../../types/Wallet";
import UserFormMessage from "../../../UserFormMessage";
import Typography from "@material-ui/core/Typography";
import {getEncryptFormDataByType, recoverWalletThunk} from "../../../../redux/thunks/wallets";
import MenuItem from "@material-ui/core/MenuItem";
import {setWallet} from "../../../../redux/actions/wallet";
import TextField from "@material-ui/core/TextField";
import {getWalletSecurityType} from "../../../../helpers/wallet";
import PaperResult from "../result/PaperResult";
import ShamirAdvancedResult from "../result/ShamirAdvancedResult";
import ShamirBasicRecoverWalletForm from "./recover/ShamirBasicRecoverWalletForm";
import ShamirBasicRecoverWalletEncryptForm from "./encrypt/ShamirBasicRecoverWalletEncryptForm";
import ShamirAdvancedRecoverWalletEncryptForm from "./encrypt/ShamirAdvancedRecoverWalletEncryptForm";
import AesBasicRecoverWalletEncryptForm from "./encrypt/AesBasicRecoverWalletEncryptForm";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

const getRecoverForm = (wallet: Wallet) => {
    switch (wallet.walletSecurityType) {
        case WalletSecurityType.ShamirBasic:
            return <ShamirBasicRecoverWalletForm wallet={wallet}/>;
        default:
            return null;
    }
};

const getEncryptForm = (wallet: Wallet) => {
    switch (wallet.state.recoverWallet.data.newSecurityType) {
        case WalletSecurityType.Paper:
            return null;
        case WalletSecurityType.ShamirBasic:
            return <ShamirBasicRecoverWalletEncryptForm wallet={wallet}/>;
        case WalletSecurityType.AesBasic:
            return <AesBasicRecoverWalletEncryptForm wallet={wallet}/>;
        case WalletSecurityType.ShamirAdvanced:
            return <ShamirAdvancedRecoverWalletEncryptForm wallet={wallet}/>;
    }
};

const getResult = (wallet: Wallet) => {
    const result = wallet.state.recoverWallet.result;
    if (result === null) {
        return null;
    }

    switch (wallet.walletSecurityType) {
        case WalletSecurityType.Paper:
            return <PaperResult result={result as any as PaperSecurityResult}/>;
        case WalletSecurityType.ShamirAdvanced:
            return <ShamirAdvancedResult result={result as any as ShamirAdvancedSecurityResult}/>;
        default:
            return null;
    }
};

const securityTypes = [WalletSecurityType.Paper, WalletSecurityType.ShamirBasic, WalletSecurityType.AesBasic, WalletSecurityType.ShamirAdvanced];

interface ChangeSecurityTypeFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const RecoverWalletForm = ({wallet, dispatch}: ChangeSecurityTypeFormProps) => {
    const classes = useStyles();

    const handleNewSecurityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                recoverWallet: {
                    ...wallet.state.recoverWallet,
                    data: {
                        ...wallet.state.recoverWallet.data,
                        newSecurityType: getWalletSecurityType(event.target.value),
                        newCredentials: getEncryptFormDataByType(getWalletSecurityType(event.target.value))
                    }
                }
            }
        }))
    };

    const submitRecoverWalletTypeForm = () => {
        dispatch(recoverWalletThunk(wallet))
    };

    return <Grid container direction={"row"}>
        {!!wallet.state.recoverWallet.state.message &&
        <UserFormMessage message={wallet.state.recoverWallet.state.message}
                         isSuccess={wallet.state.recoverWallet.state.isSuccess}/>}
        <Typography>
            Confirmation code - {wallet.walletSecurityType}
        </Typography>
        {getRecoverForm(wallet)}
        <Typography>
            New Credentials
        </Typography>
        <TextField
            select
            fullWidth
            variant={"outlined"}
            className={classes.input}
            label="Security type"
            value={wallet.state.recoverWallet.data.newSecurityType}
            onChange={handleNewSecurityTypeChange}
        >
            {securityTypes.map((securityType: WalletSecurityType) => (
                <MenuItem key={securityType.toString()} value={securityType}>{securityType.toString()}</MenuItem>
            ))}
        </TextField>
        {getEncryptForm(wallet)}
        <Button
            fullWidth
            disabled={wallet.state.recoverWallet.state.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={submitRecoverWalletTypeForm}
        >
            {wallet.state.recoverWallet.state.isSubmitting ? <CircularProgress size={24}/> : "Send"}
        </Button>
        {getResult(wallet)}
    </Grid>
};


export default connect()(RecoverWalletForm);
