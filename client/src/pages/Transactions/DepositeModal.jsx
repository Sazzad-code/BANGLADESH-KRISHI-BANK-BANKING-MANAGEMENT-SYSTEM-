import { Modal, Form, message } from 'antd'
import { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { DepositFuncds } from '../../apicalls/transactions';
function DepositModal({
    showDepositModal,
    setShowDepositModal,
    reloadData
}) {

    const [form] = Form.useForm();
    function handleClick() {
        setShowDepositModal(false)
    }
    const onToken = async(token)=>{
        try {
            const response = await DepositFuncds({token, amount:form.getFieldValue("amount"),})
            if(response.success){
                setShowDepositModal(false);
                message.success(response.message)
            }
            else{
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            title="Deposit"
            open={showDepositModal}
            onCancel={handleClick}
            footer={null}
        >
            <div className='flex-col gap-1'>
                <Form
                form={form}
                    layout='vertical'>
                    <Form.Item label="Amount" name="amount"
                        rules={[
                            {
                                required: true,
                                message: "Please input amount"
                            }
                        ]}>
                        <input type="number" />
                    </Form.Item>
                    <div className="flex justify-end gap-1">
                        <button className='primary-outlined-btn'>Cancel</button>
                        <StripeCheckout
                            token={onToken}
                            currency='USD'
                            amount={form.getFieldValue("amount")*100}
                            shippingAddress
                            stripeKey="pk_test_51QjcxzLEboJQtP6KdmZjSUQAQMUXTiCH6nj50FUJ3w48Om1JMISLIOJQwWKPo42H9cdKItJh7ApVt0LxvtV1Eeoj00YwRXgCCL"
                        >
                            <button className='primary-contained-btn'>Deposit</button>
                        </StripeCheckout>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default DepositModal;