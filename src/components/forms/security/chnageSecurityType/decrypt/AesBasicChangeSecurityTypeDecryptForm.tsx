import React from "react";
import {connect} from "react-redux";
import Wallet, {AesBasicDecrypt} from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import AesBasicDecryptForm from "../../decrypt/AesBasicDecryptForm";


interface AesBasicDecryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const AesBasicChangeSecurityTypeDecryptForm = ({wallet, dispatch}: AesBasicDecryptFormProps) => {
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

    return <AesBasicDecryptForm state={wallet.state.changeSecurityType.state}
                                data={wallet.state.changeSecurityType.data.currentCredentials as any as AesBasicDecrypt}
                                updateWalletDecryptForm={updateWalletDecryptForm}/>
};

export default connect()(AesBasicChangeSecurityTypeDecryptForm);