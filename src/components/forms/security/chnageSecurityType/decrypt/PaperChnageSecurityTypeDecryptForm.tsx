import React from "react";
import {connect} from "react-redux";
import Wallet, {PaperDecrypt} from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import PaperDecryptForm from "../../decrypt/PaperDecryptForm";


interface PaperDecryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const PaperChangeSecurityTypeDecryptForm = ({wallet, dispatch}: PaperDecryptFormProps) => {

    const updateWalletDecryptForm = (key: "privateKey") => (event: React.ChangeEvent<HTMLInputElement>) => {
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

    return <PaperDecryptForm state={wallet.state.changeSecurityType.state}
                             data={wallet.state.changeSecurityType.data.currentCredentials as any as PaperDecrypt} updateWalletDecryptForm={updateWalletDecryptForm}/>
};

export default connect()(PaperChangeSecurityTypeDecryptForm);