import React from "react";
import {connect} from "react-redux";
import Wallet, {PaperDecrypt} from "../../../../types/Wallet";
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


    return <PaperDecryptForm state={wallet.state.sendFoundsForm.state}
                             data={wallet.state.sendFoundsForm.data as any as PaperDecrypt} updateWalletDecryptForm={updateWalletDecryptForm}/>
};

export default connect()(PaperSendFoundsForm);