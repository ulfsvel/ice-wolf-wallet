import React from "react";
import {connect} from "react-redux";
import Wallet from "../../../../types/Wallet";
import {setWallet} from "../../../../redux/actions/wallet";
import PaperDecryptForm from "../decrypt/PaperDecryptForm";


interface PaperFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const PaperSendFoundsForm = ({wallet, dispatch}: PaperFormProps) => {
    const updateWalletDecryptForm = (key: "privateKey") => (event: React.ChangeEvent<HTMLInputElement>) => {
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


    return <PaperDecryptForm wallet={wallet} updateWalletDecryptForm={updateWalletDecryptForm}/>
};

export default connect()(PaperSendFoundsForm);