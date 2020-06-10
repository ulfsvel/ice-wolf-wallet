import React from "react";
import {connect} from "react-redux";
import Wallet, {ShamirBasicEncrypt} from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import ShamirBasicEncryptForm from "../../encrypt/ShamirBasicEncryptForm";


interface ShamirBasicEncryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const ShamirBasicRecoverWalletEncryptForm = ({wallet, dispatch}: ShamirBasicEncryptFormProps) => {
    const updateWalletEncryptForm = (key: "password") => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                recoverWallet: {
                    ...wallet.state.recoverWallet,
                    data: {
                        ...wallet.state.recoverWallet.data,
                        newCredentials: {
                            ...wallet.state.recoverWallet.data.newCredentials,
                            [key]: event.target.value
                        }
                    }
                }
            }
        }))
    };

    return <ShamirBasicEncryptForm state={wallet.state.recoverWallet.state}
                                   data={wallet.state.recoverWallet.data.newCredentials as any as ShamirBasicEncrypt}
                                   updateWalletEncryptForm={updateWalletEncryptForm}/>
};

export default connect()(ShamirBasicRecoverWalletEncryptForm);
