import React from "react";
import {connect} from "react-redux";
import Wallet from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import AesBasicEncryptForm from "../../encrypt/AesBasicEncryptForm";


interface AesBasicEncryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const AesBasicChangeSecurityTypeEncryptForm = ({wallet, dispatch}: AesBasicEncryptFormProps) => {
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

    return <AesBasicEncryptForm wallet={wallet} updateWalletEncryptForm={updateWalletEncryptForm}/>
};

export default connect()(AesBasicChangeSecurityTypeEncryptForm);