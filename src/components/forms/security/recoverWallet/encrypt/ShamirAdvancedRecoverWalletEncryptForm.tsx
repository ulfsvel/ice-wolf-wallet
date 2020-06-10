import React from "react";
import {connect} from "react-redux";
import Wallet, {ShamirAdvancedEncrypt} from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import ShamirAdvancedEncryptForm from "../../encrypt/ShamirAdvancedEncryptForm";


interface ShamirAdvancedChangeSecurityTypeEncryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const ShamirAdvancedChangeSecurityTypeEncryptForm = ({wallet, dispatch}: ShamirAdvancedChangeSecurityTypeEncryptFormProps) => {
    const updateWalletEncryptForm = (key: 'totalShares' | 'sharesToRebuild') => (event: React.ChangeEvent<HTMLInputElement>) => {
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
                            [key]: parseInt(event.target.value)
                        }
                    }
                }
            }
        }))
    };

    return <ShamirAdvancedEncryptForm state={wallet.state.recoverWallet.state}
                                      data={wallet.state.recoverWallet.data.newCredentials as any as ShamirAdvancedEncrypt}
                                      updateWalletEncryptForm={updateWalletEncryptForm}/>
};

export default connect()(ShamirAdvancedChangeSecurityTypeEncryptForm);
