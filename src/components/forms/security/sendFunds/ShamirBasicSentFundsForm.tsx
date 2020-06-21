import React from "react";
import {connect} from "react-redux";
import Wallet, {ShamirBasicDecrypt} from "../../../../types/Wallet";
import {setWallet} from "../../../../redux/actions/wallet";
import ShamirBasicDecryptForm from "../decrypt/ShamirBasicDecryptForm";

interface ShamirBasicDecryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const ShamirBasicSentFundsForm = ({wallet, dispatch}: ShamirBasicDecryptFormProps) => {
    const updateWalletDecryptForm = (key: "password") => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                sendFundsForm: {
                    ...wallet.state.sendFundsForm,
                    data: {
                        ...wallet.state.sendFundsForm.data,
                        [key]: event.target.value
                    }
                }
            }
        }))
    };

    return <ShamirBasicDecryptForm state={wallet.state.sendFundsForm.state}
                                   data={wallet.state.sendFundsForm.data as any as ShamirBasicDecrypt}
                                   updateWalletDecryptForm={updateWalletDecryptForm}/>
};

export default connect()(ShamirBasicSentFundsForm);
