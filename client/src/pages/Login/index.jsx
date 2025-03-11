import React from "react";
import { Col, Form, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";

function Login() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await LoginUser(values);
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = "/";
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="bg-primary  h-screen">
            <div className="m-5 flex items-center justify-center">
                {/* Swiper Banner (Bank Image) */}
                <div className="swiper-container mb-4 ">
                    <img
                        className="w-full"
                        src="https://ib.krishibank.org.bd/assets/images/bkb_left_logo.png"
                        alt="Bank Image"
                    />
                </div>

                <div className="card login-card w-400 p-2" style={{ marginTop: "180px" }}>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl text-black">BANGLADESH KRISHI BANK - LOGIN</h1>
                    </div>
                    <hr />

                    <Form layout="vertical" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Email" name="email">
                                    <input type="text" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Password" name="password">
                                    <input type="password" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div>
                            <button className="primary-contained-btn w-100" type="submit">
                                Login
                            </button>
                            <h1
                                className="text-sm underline mt-2 cursor-pointer"
                                onClick={() => navigate("/register")}
                            >
                                Not a member? Click Here To Register
                            </h1>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
