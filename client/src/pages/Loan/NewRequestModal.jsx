import React, { useState } from "react";
import { Modal, Form, message } from "antd";
import { useSelector } from "react-redux";
import { SendRequest } from "../../apicalls/loan";

function NewRequestModal({ showNewRequestModal, setShowNewRequestModal, reloadData }) {
    const { user } = useSelector((state) => state.users);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            // Automatically send the request to the admin, no need to specify the receiver
            const payload = {
                ...values,
                sender: user._id,
                description: values.description || "No description",
                status: "pending",
            };

            const response = await SendRequest(payload);
            if (response.success) {
                setShowNewRequestModal(false);
                message.success(response.message);
                reloadData(); // Refresh loan list
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.toString());
        }
    };

    return (
        <Modal
            title="Apply for Loan"
            open={showNewRequestModal}
            onCancel={() => setShowNewRequestModal(false)}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Enter amount" }]}>
                    <input type="number" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <textarea />
                </Form.Item>

                <div className="flex justify-end">
                    <button className="primary-outlined-btn" onClick={() => setShowNewRequestModal(false)}>
                        Cancel
                    </button>
                    <button className="primary-contained-btn" type="submit">
                        Apply Loan
                    </button>
                </div>
            </Form>
        </Modal>
    );
}

export default NewRequestModal;
