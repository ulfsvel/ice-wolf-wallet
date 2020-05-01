import React from "react";
import {connect} from "react-redux";
import Wallet, {ShamirAdvancedDecrypt} from "../../../../../types/Wallet";
import {setWallet} from "../../../../../redux/actions/wallet";
import ShamirAdvancedDecryptForm from "../../decrypt/ShamirAdvancedDecryptForm";


interface ShamirAdvancedChangeSecurityTypeDecryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const ShamirAdvancedChangeSecurityTypeDecryptForm = ({wallet, dispatch}: ShamirAdvancedChangeSecurityTypeDecryptFormProps) => {
    const form = wallet.state.changeSecurityType.data.currentCredentials as unknown as ShamirAdvancedDecrypt;

    const updateWalletDecryptFormShares = (key: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const shares = form.shares.map((value: string, arrayKey: number) => key === arrayKey ? event.target.value : value);
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
                            shares: shares
                        }
                    }
                }
            }
        }))
    };

    const addWalletDecryptFormShare = () => {
        const shares = [...form.shares, ''];
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
                            shares: shares
                        }
                    }
                }
            }
        }))
    };

    const removeWalletDecryptFormShare = () => {
        if (form.shares.length > 1) {
            const shares = form.shares.slice(0, form.shares.length - 2);
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
                                shares: shares
                            }
                        }
                    }
                }
            }))
        }
    };

    return <ShamirAdvancedDecryptForm wallet={wallet} updateWalletDecryptFormShares={updateWalletDecryptFormShares}
                                      addWalletDecryptFormShare={addWalletDecryptFormShare}
                                      removeWalletDecryptFormShare={removeWalletDecryptFormShare}/>
};

export default connect()(ShamirAdvancedChangeSecurityTypeDecryptForm);