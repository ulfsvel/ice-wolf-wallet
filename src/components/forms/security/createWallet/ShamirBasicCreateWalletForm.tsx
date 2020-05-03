import React from "react";
import {connect} from "react-redux";
import {CreateWalletFormState, ShamirBasicEncrypt} from "../../../../types/Wallet";
import ShamirBasicEncryptForm from "../encrypt/ShamirBasicEncryptForm";
import {setCreateWalletFormState} from "../../../../redux/actions/wallet";


interface ShamirBasicEncryptFormProps {
    form: CreateWalletFormState
    dispatch: (arg0: any) => void,
}

const ShamirBasicCreateWalletForm = ({form, dispatch}: ShamirBasicEncryptFormProps) => {
    const updateWalletEncryptForm = (key: "password") => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCreateWalletFormState({
            ...form,
            data: {
                ...form.data,
                securityTypeData: {
                    ...form.data.securityTypeData,
                    [key]: event.target.value
                }
            }
        }))
    };

    return <ShamirBasicEncryptForm state={form.state}
                                   data={form.data.securityTypeData as any as ShamirBasicEncrypt}
                                   updateWalletEncryptForm={updateWalletEncryptForm}/>
};

export default connect()(ShamirBasicCreateWalletForm);