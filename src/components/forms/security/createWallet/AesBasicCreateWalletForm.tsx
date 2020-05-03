import React from "react";
import {connect} from "react-redux";
import {AesBasicEncrypt, CreateWalletFormState} from "../../../../types/Wallet";
import {setCreateWalletFormState} from "../../../../redux/actions/wallet";
import AesBasicEncryptForm from "../encrypt/AesBasicEncryptForm";


interface AesBasicEncryptFormProps {
    form: CreateWalletFormState
    dispatch: (arg0: any) => void,
}

const AesBasicCreateWalletForm = ({form, dispatch}: AesBasicEncryptFormProps) => {
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

    return <AesBasicEncryptForm state={form.state} data={form.data.securityTypeData as any as AesBasicEncrypt}
                                updateWalletEncryptForm={updateWalletEncryptForm}/>
};

export default connect()(AesBasicCreateWalletForm);