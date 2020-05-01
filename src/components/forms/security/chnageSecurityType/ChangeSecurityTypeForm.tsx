import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Wallet, {WalletSecurityType} from "../../../../types/Wallet";
import UserFormMessage from "../../../UserFormMessage";
import Typography from "@material-ui/core/Typography";
import {changeSecurityTypeThunk, getEncryptFormDataByType} from "../../../../redux/thunks/wallets";
import PaperChangeSecurityTypeDecryptForm from "./decrypt/PaperChnageSecurityTypeDecryptForm";
import ShamirBasicChangeSecurityTypeDecryptForm from "./decrypt/ShamirBasicChangeSecurityTypeDecryptForm";
import AesBasicChangeSecurityTypeDecryptForm from "./decrypt/AesBasicChangeSecurityTypeDecryptForm";
import ShamirAdvancedChangeSecurityTypeDecryptForm from "./decrypt/ShamirAdvancedChnageSecurityTypeDecryptForm";
import ShamirBasicChangeSecurityTypeEncryptForm from "./encrypt/ShamirBasicChangeSecurityTypeEncryptForm";
import AesBasicChangeSecurityTypeEncryptForm from "./encrypt/AesBasicChangeSecurityTypeEncryptForm";
import ShamirAdvancedChangeSecurityTypeEncryptForm from "./encrypt/ShamirAdvancedChnageSecurityTypeEncryptForm";
import MenuItem from "@material-ui/core/MenuItem";
import {setWallet} from "../../../../redux/actions/wallet";
import TextField from "@material-ui/core/TextField";
import {getWalletSecurityType} from "../../../../helpers/wallet";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

const getDecryptForm = (wallet: Wallet) => {
    switch (wallet.walletSecurityType) {
        case WalletSecurityType.Paper:
            return <PaperChangeSecurityTypeDecryptForm wallet={wallet}/>;
        case WalletSecurityType.ShamirBasic:
            return <ShamirBasicChangeSecurityTypeDecryptForm wallet={wallet}/>;
        case WalletSecurityType.AesBasic:
            return <AesBasicChangeSecurityTypeDecryptForm wallet={wallet}/>;
        case WalletSecurityType.ShamirAdvanced:
            return <ShamirAdvancedChangeSecurityTypeDecryptForm wallet={wallet}/>;
    }
};

const getEncryptForm = (wallet: Wallet) => {
    switch (wallet.state.changeSecurityType.data.newSecurityType) {
        case WalletSecurityType.Paper:
            return null;
        case WalletSecurityType.ShamirBasic:
            return <ShamirBasicChangeSecurityTypeEncryptForm wallet={wallet}/>;
        case WalletSecurityType.AesBasic:
            return <AesBasicChangeSecurityTypeEncryptForm wallet={wallet}/>;
        case WalletSecurityType.ShamirAdvanced:
            return <ShamirAdvancedChangeSecurityTypeEncryptForm wallet={wallet}/>;
    }
};

const securityTypes = [WalletSecurityType.Paper, WalletSecurityType.ShamirBasic, WalletSecurityType.AesBasic, WalletSecurityType.ShamirAdvanced];

interface ChangeSecurityTypeFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const ChangeSecurityTypeForm = ({wallet, dispatch}: ChangeSecurityTypeFormProps) => {
    const classes = useStyles();

    const handleNewSecurityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                changeSecurityType: {
                    ...wallet.state.changeSecurityType,
                    data: {
                        ...wallet.state.changeSecurityType.data,
                        newSecurityType: getWalletSecurityType(event.target.value),
                        newCredentials: getEncryptFormDataByType(getWalletSecurityType(event.target.value))
                    }
                }
            }
        }))
    };

    const submitChangeSecurityTypeForm = () => {
        dispatch(changeSecurityTypeThunk(wallet))
    };

    return <Grid container direction={"row"}>
        {!!wallet.state.changeSecurityType.state.message &&
        <UserFormMessage message={wallet.state.changeSecurityType.state.message}
                         isSuccess={wallet.state.changeSecurityType.state.isSuccess}/>}
        <Typography>
            Current credentials - {wallet.walletSecurityType}
        </Typography>
        {getDecryptForm(wallet)}
        <Typography>
            New Credentials
        </Typography>
        <TextField
            select
            fullWidth
            variant={"outlined"}
            className={classes.input}
            label="Security type"
            value={wallet.state.changeSecurityType.data.newSecurityType}
            onChange={handleNewSecurityTypeChange}
        >
            {securityTypes.map((securityType: WalletSecurityType) => (
                <MenuItem key={securityType.toString()} value={securityType}>{securityType.toString()}</MenuItem>
            ))}
        </TextField>
        {getEncryptForm(wallet)}
        <Button
            fullWidth
            disabled={wallet.state.changeSecurityType.state.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={submitChangeSecurityTypeForm}
        >
            {wallet.state.changeSecurityType.state.isSubmitting ? <CircularProgress size={24}/> : "Send"}
        </Button>
    </Grid>
};


export default connect()(ChangeSecurityTypeForm);