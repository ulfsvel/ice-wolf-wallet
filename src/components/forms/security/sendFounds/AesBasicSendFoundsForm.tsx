import React from "react";
import {connect} from "react-redux";
import Wallet from "../../../../types/Wallet";
import {setWallet} from "../../../../redux/actions/wallet";
import AesBasicDecryptForm from "../decrypt/AesBasicDecryptForm";

interface AesBasicDecryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const AesBasicSendFoundsForm = ({wallet, dispatch}: AesBasicDecryptFormProps) => {
    const updateWalletDecryptForm = (key: "password") => (event: React.ChangeEvent<HTMLInputElement>) => {
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

    return <AesBasicDecryptForm wallet={wallet} updateWalletDecryptForm={updateWalletDecryptForm}/>
};

export default connect()(AesBasicSendFoundsForm);