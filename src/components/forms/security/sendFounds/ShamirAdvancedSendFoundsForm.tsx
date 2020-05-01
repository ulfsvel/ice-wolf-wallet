import React from "react";
import {connect} from "react-redux";
import Wallet, {ShamirAdvancedTransferForm} from "../../../../types/Wallet";
import {setWallet} from "../../../../redux/actions/wallet";
import ShamirAdvancedDecryptForm from "../decrypt/ShamirAdvancedDecryptForm";


interface ShamirAdvancedDecryptFormProps {
    wallet: Wallet
    dispatch: (arg0: any) => void,
}

const ShamirAdvancedSendFoundsForm = ({wallet, dispatch}: ShamirAdvancedDecryptFormProps) => {
    const form = wallet.state.sendFoundsForm as unknown as ShamirAdvancedTransferForm;

    const updateWalletDecryptFormShares = (key: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const shares = form.shares.map((value: string, arrayKey: number) => key === arrayKey ? event.target.value : value);
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                sendFoundsForm: {
                    ...wallet.state.sendFoundsForm,
                    data: {
                        ...wallet.state.sendFoundsForm.data,
                        shares: shares
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
                sendFoundsForm: {
                    ...wallet.state.sendFoundsForm,
                    data: {
                        ...wallet.state.sendFoundsForm.data,
                        shares: shares
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
                    sendFoundsForm: {
                        ...wallet.state.sendFoundsForm,
                        data: {
                            ...wallet.state.sendFoundsForm.data,
                            shares: shares
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

export default connect()(ShamirAdvancedSendFoundsForm);