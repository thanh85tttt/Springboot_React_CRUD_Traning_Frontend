import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, Radio, message, Row, Col, Card, Modal } from 'antd';

import { Link, useHistory } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import { storage } from './../../../firebase'
import PrefixService from '../../../services/PrefixService';
import { IPrefix } from '../../../interfaces/IPrefix';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../../actions/auth';
import { createEmployee } from '../../../actions/employees';
import { CANCEL_POPUP, ERROR, NOT_EXIST_PHONE_PREFIX, RELOAD_PAGE_QUESTION, UPLOAD_FILE_WARNING, WARNING } from '../../../constants/common-message';
import {
    ADDRESS_LENGTH_RULE,
    EMAIL_LENGTH_RULE,
    EMAIL_REQUIRED_RULE,
    FULLNAME_LENGTH_RULE,
    FULLNAME_REQUIRED_RULE,
    PASSWORD_LENGTH_RULE,
    PASSWORD_REQUIRED,
    PHONE_REQUIRED_RULE,
    VALID_FORMAT_EMAIL_RULE,
    VALID_FORMAT_FULLNAME_RULE,
    VALID_FORMAT_PASSWORD_RULE,
    VALID_FORMAT_PHONE_RULE
} from '../../../constants/common-rules';
import TextArea from 'antd/lib/input/TextArea';
import { EMAIL_PATTERN, FULLNAME_PATTERN, PASSWORD_PATTERN, PHONE_PATTERN } from '../../../constants/common-pattern';
import { IEmployeeAndPassword } from '../../../interfaces/IEmployeeAndPassword';
import { AppDispatch, RootState } from '../../../store';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

/**
 * CreateEmployeeComponent
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By Thanh
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       ThanhBT11           Create
 */
export const CreateEmployeeComponent = () => {

    let history = useHistory();

    const [gender, setGender] = useState('Male');
    const [file, setFile] = useState<any | null>();
    const [imageUrl, setImageUrl] = useState<any | null>();
    const [prefixList, setPrefixList] = useState<IPrefix[]>();

    const [form] = Form.useForm();

    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)

    const dispatch: AppDispatch = useDispatch();

    /**
    * Load error and success message
    */
    useEffect(() => {
        if (Error) {
            errorPopup(ERROR, Error)
            dispatch(clearState());
        }
        if (Success) {
            history.push('/admin/employees');
            message.success(Success);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Process create new employee when submit success
     * @param values contains create information
     * @returns 
     */
    const onFinish = (values: IEmployeeAndPassword) => {

        console.log(values.password);

        var isOptionTextExist = false;
        var textInOption = document.getElementsByClassName('ant-select-selection-item');

        //Test phone prefix title is exist in database
        prefixList?.map((prefix: any) => {
            if (prefix.title === textInOption[0].innerHTML) {
                isOptionTextExist = true;
            }
        });

        //If phone prefix exist, process get image from computer, then create employee and post image to firebase
        if (isOptionTextExist) {
            values.fullName = values.fullName.replace(/\s+$/, '');
            values.gender = gender;
            values.phone = form.getFieldValue('prefix') + form.getFieldValue('phone');

            //If file upload exist, check type of file is valid or not, if not 
            if (file) {
                console.log(file);
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    errorPopup(WARNING, UPLOAD_FILE_WARNING);
                    setFile(null);
                    return;
                }
                const uploadTask = storage.ref(`/images/${file.name}`).put(file);
                uploadTask.on("state_changed", console.log, console.error, () => {
                    storage
                        .ref("images")
                        .child(file.name)
                        .getDownloadURL()
                        .then((url) => {
                            values.image = url;
                            dispatch(createEmployee(values));
                        });
                });
            } else {
                dispatch(createEmployee(values));
            }
        } else {
            errorPopup(ERROR, NOT_EXIST_PHONE_PREFIX);
        }
    };

    /**
     * Process when submit fail
     * @param errorInfo show error to log
     */
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
        (document.getElementsByClassName("ant-input")[0] as HTMLElement).focus();
    };

    /**
     * Handle change gender
     * @param event change event
     */
    function handleChangeGender(event: any) {
        setGender(event.target.value);
    }

    /**
     * Get phone prefix
     */
    useEffect(() => {
        PrefixService.getPrefix().then((res) => {
            setPrefixList(res.data);
        })
    }, [])

    /**
    * Load error and success message
    */
    function errorPopup(title: string, error: any) {
        Modal.confirm({
            title: title,
            content: <>
                <p>{error}</p>
                <p>{RELOAD_PAGE_QUESTION}</p>
            </>,
            onOk: () => handleOK(),
            onCancel: () => handleCancel()
        });
    }

    /**
   * Show handle popup ok
   */
    const handleOK = () => {
        history.push('/admin/employees');
    }

    /**
     * Cancel popup
     */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };

    /**
     * Get phone number prefix and set to select
     */
    const prefixSelector = (
        <Form.Item name="prefix"

            noStyle>
            <Select style={{ width: 100 }} tabIndex={13}
            >
                {
                    prefixList?.map((prefix: IPrefix, index: number) => (
                        <Option value={prefix.value}
                            key={index}>
                            {prefix.title}
                        </Option>
                    ))
                }
            </Select>
        </Form.Item>
    );  

    /**
     * Reset data fields
     */
    const onReset = () => {
        form.resetFields();
        form.setFieldsValue({
            gender: "Male"
        });
    };

    /**
     * Set file image when image change
     * @param e change event
     */
    function handleImageChange(e: any) {
        e.preventDefault();

        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }

        console.log('image' + file);
    }

    return (
        <React.Fragment>

            <Row gutter={16}>
                <Col span={7}>

                </Col>
                <Col span={10}>
                    <Card title={<Title level={2}
                        style={{ textAlign: 'center' }}>Create Employee</Title>}
                        bordered={false}>

                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            labelAlign="left"
                            form={form}
                            colon={false}
                        >

                            <Form.Item
                                label="FullName"
                                name='fullName'
                                rules={[
                                    {
                                        required: true,
                                        message: FULLNAME_REQUIRED_RULE, whitespace: false,
                                    },
                                    {
                                        min: 5,
                                        max: 60,
                                        message: FULLNAME_LENGTH_RULE
                                    },
                                    {
                                        pattern: FULLNAME_PATTERN,
                                        message: VALID_FORMAT_FULLNAME_RULE
                                    }
                                ]}
                            >
                                <Input tabIndex={11} autoFocus/>
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name='email'
                                rules={[
                                    { required: true, message: EMAIL_REQUIRED_RULE },
                                    {
                                        pattern: EMAIL_PATTERN,
                                        message: VALID_FORMAT_EMAIL_RULE
                                    },
                                    {
                                        min: 6,
                                        max: 60,
                                        message: EMAIL_LENGTH_RULE
                                    }
                                ]}
                            >
                                <Input tabIndex={12} />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: PASSWORD_REQUIRED },
                                    {
                                        min: 8,
                                        max: 60,
                                        message: PASSWORD_LENGTH_RULE
                                    },
                                    {
                                        pattern: PASSWORD_PATTERN,
                                        message: VALID_FORMAT_PASSWORD_RULE
                                    }
                                ]}
                            >
                                <Input.Password tabIndex={12} />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name='phone'
                                rules={[
                                    { required: true, message: PHONE_REQUIRED_RULE },
                                    {
                                        pattern: PHONE_PATTERN,
                                        message: VALID_FORMAT_PHONE_RULE
                                    }
                                ]}
                            >
                                <Input addonBefore={prefixSelector} tabIndex={14} style={{ width: "60%" }} />
                            </Form.Item>

                            <Form.Item
                                label="Address"
                                name='address'
                                rules={[
                                    {
                                        min: 1,
                                        max: 100,
                                        message: ADDRESS_LENGTH_RULE
                                    }
                                ]}
                            >
                                <TextArea tabIndex={15} />
                            </Form.Item>

                            <Form.Item
                                label="Gender"
                                name='gender'
                            >
                                <Radio.Group
                                    onChange={(event) => handleChangeGender(event)}
                                    defaultValue={gender} value={gender}>

                                    <Radio value={'Male'} tabIndex={16}>Male</Radio>
                                    <Radio value={'Female'} tabIndex={17}>Female</Radio>

                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Image"
                            >
                                {(imageUrl) ? <img src={imageUrl} alt="avatar" style={{ width: '100px', height: "100px", borderRadius: "6px", marginLeft: "5px", marginBottom: "5px" }} /> : ''}
                                <input style={{ marginLeft: "5px" }}
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="/image/*"
                                    id="fileControl"
                                    tabIndex={18} />
                            </Form.Item>

                            <Form.Item {...tailLayout}>

                                <Link to='/admin/employees' >
                                    <Button type="primary" danger tabIndex={19}>
                                        Back
                                    </Button>
                                </Link>

                                <Button htmlType="button"
                                    onClick={onReset}
                                    style={{ marginLeft: '5px' }}
                                    tabIndex={20}>
                                    Reset
                                </Button>

                                <Button type="primary"
                                    htmlType="submit"
                                    style={{ marginLeft: '5px' }}
                                    tabIndex={21}
                                >
                                    Submit
                                </Button>

                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={7}>

                </Col>
            </Row>

        </React.Fragment>
    )
}
