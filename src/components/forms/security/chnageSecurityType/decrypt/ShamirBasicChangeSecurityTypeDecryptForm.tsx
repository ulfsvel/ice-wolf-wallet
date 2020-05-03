import React from "react";
import {connect} from "react-redux";
import Wallet, {ShamirBasicDecrypt} from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import ShamirBasicDecryptForm from "../../decrypt/ShamirBasicDecryptForm";


interface ShamirBasicDecryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const ShamirBasicChangeSecurityTypeDecryptForm = ({wallet, dispatch}: ShamirBasicDecryptFormProps) => {
    const updateWalletDecryptForm = (key: "password") => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                changeSecurityType: {
                    ...wallet.state.changeSecurityType,
                    data: {
                        ...wallet.state.changeSecurityType.data,
                        currentCredentials: {
                            ...wallet.state.changeSecurityType.data.currentCredentials,
                            [key]: event.target.value
                        }
                    }
                }
            }
        }))
    };

    return <ShamirBasicDecryptForm state={wallet.state.changeSecurityType.state}
                                   data={wallet.state.changeSecurityType.data.currentCredentials as any as ShamirBasicDecrypt}
                                   updateWalletDecryptForm={updateWalletDecryptForm}/>
};

export default connect()(ShamirBasicChangeSecurityTypeDecryptForm);