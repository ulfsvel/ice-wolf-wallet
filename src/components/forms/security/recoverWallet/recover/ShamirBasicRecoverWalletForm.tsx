import React from "react";
import {connect} from "react-redux";
import Wallet, {ShamirBasicRecoverCredentials} from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import ShamirBasicRecoverForm from "../../recover/ShamirBasicRecoverForm";


interface ShamirBasicDecryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const ShamirBasicRecoverWalletForm = ({wallet, dispatch}: ShamirBasicDecryptFormProps) => {
    const updateWalletRecoverForm = (key: "confirmationCode") => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                recoverWallet: {
                    ...wallet.state.recoverWallet,
                    data: {
                        ...wallet.state.recoverWallet.data,
                        recoverCredentials: {
                            ...wallet.state.recoverWallet.data.recoverCredentials,
                            [key]: event.target.value
                        }
                    }
                }
            }
        }))
    };

    return <ShamirBasicRecoverForm state={wallet.state.changeSecurityType.state}
                                   data={wallet.state.recoverWallet.data.recoverCredentials as any as ShamirBasicRecoverCredentials}
                                   updateWalletRecoverForm={updateWalletRecoverForm}/>
};

export default connect()(ShamirBasicRecoverWalletForm);
