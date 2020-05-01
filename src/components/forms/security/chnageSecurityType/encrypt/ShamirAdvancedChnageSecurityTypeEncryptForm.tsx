import React from "react";
import {connect} from "react-redux";
import Wallet from "../../../../../types/Wallet";
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
                changeSecurityType: {
                    ...wallet.state.changeSecurityType,
                    data: {
                        ...wallet.state.changeSecurityType.data,
                        newCredentials: {
                            ...wallet.state.changeSecurityType.data.newCredentials,
                            [key]: parseInt(event.target.value)
                        }
                    }
                }
            }
        }))
    };

    return <ShamirAdvancedEncryptForm wallet={wallet} updateWalletEncryptForm={updateWalletEncryptForm}/>
};

export default connect()(ShamirAdvancedChangeSecurityTypeEncryptForm);