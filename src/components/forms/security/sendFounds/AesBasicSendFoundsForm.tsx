import React from "react";
import {connect} from "react-redux";
import Wallet, {AesBasicDecrypt} from "../../../../types/Wallet";
import {setWallet} from "../../../../redux/actions/wallet";
import AesBasicDecryptForm from "../decrypt/AesBasicDecryptForm";

interface AesBasicDecryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const AesBasicSendFundsForm = ({wallet, dispatch}: AesBasicDecryptFormProps) => {
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

    return <AesBasicDecryptForm state={wallet.state.sendFundsForm.state}
                                data={wallet.state.sendFundsForm.data as any as AesBasicDecrypt}
                                updateWalletDecryptForm={updateWalletDecryptForm}/>
};

export default connect()(AesBasicSendFundsForm);
