import React, { useState } from "react";
import { Modal, Form, message } from "antd";
// import { verify } from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "../../apicalls/transactions";
import { TransferFunds } from "../../apicalls/transactions";
// import {ShowLoading, HideLoading} form "../../redux/loadersSlice"

function TransferFundsModal({
    showTransferFundsModal,
    setShowTransferFundsModal,
    reloadData,
}) {

    const { user } = useSelector(state => state.users);
    const [isVerified, setIsVerified] = useState(true)
    function handleClick() {
        setShowTransferFundsModal(false)
    }

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleVerifyAccount = async () => {

        try {
            // dispatch(ShowLoading())
            const response = await verifyAccount({

                receiver: form.getFieldValue("receiver")
            })
            // dispatch(HideLoading())
            if (response.success) {
                setIsVerified("true")
            }
            else {
                setIsVerified("false")
            }


        } catch (error) {
            // dispatch(HideLoading())
            setIsVerified("false")
        }

    };
    const onFinish = async (values) => {

        try {
            // dispatch(ShowLoading())
            const payload = {
                ...values,
                sender: user._id,
                reference: values.reference || "no reference",
                status: "success",
            };
            const response = await TransferFunds(payload);
            if (response.success) {
                setShowTransferFundsModal(false);
                message.success(response.message);
            } else {
                message.error(response.message);
            }
            // dispatch(HideLoading());
        } catch (error) {
            message.error(error.toString());
            // dispatch(HideLoading());

        }
    };


    return (
        <div>
            <Modal
                title="Transfer Funds"
                open={showTransferFundsModal}
                onCancel={handleClick}
                footer={null}
            >
                <Form layout="vertical"
                    form={form}
                    onFinish={onFinish}
                >
                    < div className="flex gap-2 items-center">
                        <Form.Item label="Account Number" name="receiver" className="w-100">
                            <input type="text" />
                        </Form.Item>
                        <button className="primary-contained-btn mt-1" type="button"
                            onClick={handleVerifyAccount}
                        >
                            VERIFY
                        </button>
                    </div>

                    {isVerified === 'true' && (
                        <div className="success-bg">Account verified successfully</div>
                    )}
                    {isVerified === 'false' && (
                        <div className="error-bg"> Invalid Account </div>
                    )}

                    <Form.Item label="Amount" name="amount"
                        rules={[
                            {
                                required: true,
                                message: "please input your amount!",
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || Number(value) <= user.balance) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Insufficient Balance"));
                                },
                            },
                        ]}
                    >
                        <input type="number"
                            max={user.balance}
                        />
                    </Form.Item>

                    <Form.Item label="Reference" name="reference" >
                        <textarea type="text" />
                    </Form.Item>

                    <div className="flex justify-end gap-1">
                        <button className="primary-outlined-btn"> Cancel </button>
                        {isVerified === "true" && (
                            <button className="primary-contained-btn" type="submit">
                                Transfer
                            </button>
                        )}

                    </div>
                </Form>

            </Modal>
        </div>
    );
}

export default TransferFundsModal;