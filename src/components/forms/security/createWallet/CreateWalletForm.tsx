import React from "react";
import {makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {
    CreateWalletFormState,
    PaperSecurityResult, securityTypes,
    ShamirAdvancedSecurityResult, types,
    WalletSecurityType, WalletType
} from "../../../../types/Wallet";
import PaperResult from "../result/PaperResult";
import ShamirAdvancedResult from "../result/ShamirAdvancedResult";
import UserFormMessage from "../../../UserFormMessage";
import {State} from "../../../../redux/store";
import {setCreateWalletFormState} from "../../../../redux/actions/wallet";
import {getWalletSecurityType, getWalletTypeWithDefault} from "../../../../helpers/wallet";
import {createWalletThunk, getEncryptFormDataByType} from "../../../../redux/thunks/wallets";
import ShamirBasicCreateWalletForm from "./ShamirBasicCreateWalletForm";
import AesBasicCreateWalletForm from "./AesBasicCreateWalletForm";
import ShamirAdvancedCreateWalletForm from "./ShamirAdvancedCreateWalletForm";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


const getForm = (form: CreateWalletFormState) => {
    switch (form.data.securityType) {
        case WalletSecurityType.Paper:
            return null;
        case WalletSecurityType.ShamirBasic:
            return <ShamirBasicCreateWalletForm form={form}/>;
        case WalletSecurityType.AesBasic:
            return <AesBasicCreateWalletForm form={form}/>;
        case WalletSecurityType.ShamirAdvanced:
            return <ShamirAdvancedCreateWalletForm form={form}/>;
    }
};

const getResult = (form: CreateWalletFormState) => {
    const result = form.result.data;
    if (result === null) {
        return null;
    }

    switch (form.result.securityType) {
        case WalletSecurityType.Paper:
            return <PaperResult result={result as any as PaperSecurityResult}/>;
        case WalletSecurityType.ShamirAdvanced:
            return <ShamirAdvancedResult result={result as any as ShamirAdvancedSecurityResult}/>;
        default:
            return null;
    }
};

interface CreateWalletFormProps {
    form: CreateWalletFormState
    dispatch: (arg0: any) => void,
}

const CreateWalletForm = ({form, dispatch}: CreateWalletFormProps) => {
    const classes = useStyles();

    const handleNewSecurityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const securityType = getWalletSecurityType(event.target.value);
        dispatch(setCreateWalletFormState({
            ...form,
            data: {
                ...form.data,
                securityType: securityType,
                securityTypeData: getEncryptFormDataByType(securityType)
            }
        }));
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCreateWalletFormState({
            ...form,
            data: {
                ...form.data,
                type: getWalletTypeWithDefault(event.target.value)
            }
        }));
    };

    const submitCreateWalletForm = () => {
        dispatch(createWalletThunk(form))
    };

    return <Grid container direction={"row"}>
        {!!form.state.message &&
        <UserFormMessage message={form.state.message}
                         isSuccess={form.state.isSuccess}/>}
        <TextField
            select
            fullWidth
            variant={"outlined"}
            className={classes.input}
            label="Type"
            value={form.data.type}
            onChange={handleTypeChange}
        >
            {types.map((type: WalletType) => (
                <MenuItem key={type.toString()} value={type}>{type.toString()}</MenuItem>
            ))}
        </TextField>
        <Typography>
            Security
        </Typography>
        <TextField
            select
            fullWidth
            variant={"outlined"}
            className={classes.input}
            label="Security type"
            value={form.data.securityType}
            onChange={handleNewSecurityTypeChange}
        >
            {securityTypes.map((securityType: WalletSecurityType) => (
                <MenuItem key={securityType.toString()} value={securityType}>{securityType.toString()}</MenuItem>
            ))}
        </TextField>
        {getForm(form)}
        <Button
            fullWidth
            disabled={form.state.isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={submitCreateWalletForm}
        >
            {form.state.isSubmitting ? <CircularProgress size={24}/> : "Create"}
        </Button>
        {getResult(form)}
    </Grid>
};


const mapStateToProps = (state: State) => ({
    form: state.wallet.createWalletForm
});

export default connect(mapStateToProps)(CreateWalletForm);