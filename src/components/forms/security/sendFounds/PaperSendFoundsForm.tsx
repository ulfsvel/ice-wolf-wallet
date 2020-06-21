import React from "react";
import {connect} from "react-redux";
import Wallet, {PaperDecrypt} from "../../../../types/Wallet";
import {setWallet} from "../../../../redux/actions/wallet";
import PaperDecryptForm from "../decrypt/PaperDecryptForm";


interface PaperFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const PaperSendFundsForm = ({wallet, dispatch}: PaperFormProps) => {
    const updateWalletDecryptForm = (key: "privateKey") => (event: React.ChangeEvent<HTMLInputElement>) => {
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


    return <PaperDecryptForm state={wallet.state.sendFundsForm.state}
                             data={wallet.state.sendFundsForm.data as any as PaperDecrypt} updateWalletDecryptForm={updateWalletDecryptForm}/>
};

export default connect()(PaperSendFundsForm);
