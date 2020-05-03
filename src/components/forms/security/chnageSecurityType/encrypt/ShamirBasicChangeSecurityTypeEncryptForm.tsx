import React from "react";
import {connect} from "react-redux";
import Wallet, {ShamirBasicEncrypt} from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import ShamirBasicEncryptForm from "../../encrypt/ShamirBasicEncryptForm";


interface ShamirBasicEncryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const ShamirBasicChangeSecurityTypeEncryptForm = ({wallet, dispatch}: ShamirBasicEncryptFormProps) => {
    const updateWalletEncryptForm = (key: "password") => (event: React.ChangeEvent<HTMLInputElement>) => {
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
                            [key]: event.target.value
                        }
                    }
                }
            }
        }))
    };

    return <ShamirBasicEncryptForm state={wallet.state.changeSecurityType.state}
                                   data={wallet.state.changeSecurityType.data.newCredentials as any as ShamirBasicEncrypt}
                                   updateWalletEncryptForm={updateWalletEncryptForm}/>
};

export default connect()(ShamirBasicChangeSecurityTypeEncryptForm);