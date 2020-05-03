import React from "react";
import {connect} from "react-redux";
import {CreateWalletFormState, ShamirAdvancedEncrypt} from "../../../../types/Wallet";
import ShamirAdvancedEncryptForm from "../encrypt/ShamirAdvancedEncryptForm";
import {setCreateWalletFormState} from "../../../../redux/actions/wallet";


interface ShamirAdvancedChangeSecurityTypeEncryptFormProps {
    form: CreateWalletFormState
    dispatch: (arg0: any) => void,
}

const ShamirAdvancedChangeSecurityTypeEncryptForm = ({form, dispatch}: ShamirAdvancedChangeSecurityTypeEncryptFormProps) => {
    const updateWalletEncryptForm = (key: 'totalShares' | 'sharesToRebuild') => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCreateWalletFormState({
            ...form,
            data: {
                ...form.data,
                securityTypeData: {
                    ...form.data.securityTypeData,
                    [key]: parseInt(event.target.value)
                }
            }
        }))
    };

    return <ShamirAdvancedEncryptForm state={form.state}
                                      data={form.data.securityTypeData as any as ShamirAdvancedEncrypt}
                                      updateWalletEncryptForm={updateWalletEncryptForm}/>
};

export default connect()(ShamirAdvancedChangeSecurityTypeEncryptForm);