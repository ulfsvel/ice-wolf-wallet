import React from "react";
import {connect} from "react-redux";
import Wallet, {AesBasicEncrypt} from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import AesBasicEncryptForm from "../../encrypt/AesBasicEncryptForm";


interface AesBasicEncryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const AesBasicRecoverWalletEncryptForm = ({wallet, dispatch}: AesBasicEncryptFormProps) => {
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

    return <AesBasicEncryptForm state={wallet.state.recoverWallet.state}
                                data={wallet.state.recoverWallet.data.newCredentials as any as AesBasicEncrypt}
                                updateWalletEncryptForm={updateWalletEncryptForm}/>
};

export default connect()(AesBasicRecoverWalletEncryptForm);
