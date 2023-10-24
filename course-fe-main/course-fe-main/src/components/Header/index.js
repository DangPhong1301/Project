/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiClient } from '../../interceptors/axios';
import jwt from 'jwt-decode'
import { Button, Dropdown, Space, Modal, Radio } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Header() {
    const [email, setEmail] = useState('');
    useEffect(() => {
        checkLogin();
    }, [])
    const checkLogin = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setEmail('')
        } else {
            const jwt_decode = jwt(accessToken);
            setEmail(jwt_decode.email)
        }
    }
    const { register, handleSubmit } = useForm();
    // CHANGE INFO
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('male');
    const [file, setFile] = useState({ preview: '', fileData: '' });

    const showChangeIFModal = () => {
        setOpen(true)
    }
    const handleOk = () => {
        setOpen(false)
    }
    const handleCancel = () => {
        setOpen(false)
    }
    const hiddenModal = () => {
        setOpen(!open)
    }
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const handleChangeFile = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            fileData: e.target.files[0],
        }
        setFile(img);
    }
    const onEditSubmit = async (data) => {
        let formData = new FormData();
        formData.append('file', file.fileData);
        formData.append('fullname', data['fullname']);
        formData.append('phone', data['phone']);
        formData.append('dob', data['dob']);
        formData.append('sex', value);
        axios.interceptors.request.use(
            (config) => {
                const email = localStorage.getItem("accessToken");
                if (email) {
                    config.headers.Authorization = email;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        await axios.post('http://localhost:8081/api/student/update-information', formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            if (res.status == 200) {
                toast.success(`${res.data.msg}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(`${res.data.msg}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
    }
    // CHANGE PASSWORD
    const [openPassword, setOpenPassword] = useState(false);
    const showChangePassModal = () => {
        setOpenPassword(true);
    }
    const handleOkPassword = () => {
        setOpenPassword(false);
    }
    const handleCancelPassword = () => {
        setOpenPassword(false)
    };
    const onPasswordSubmit = async (data) => {
        if (data['password'].length < 6) {
            return toast.error('Mật Khẩu Phải Hơn 6 Ký Tự', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        await ApiClient().post('student/change-password', data).then(res => {
            if (res.status == 200) {
                toast.success(`${res.data.msg}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                handleOkPassword();
            } else {
                toast.error(`${res.data.msg}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
    }
    // HISTORY MODAL
    const [openHistoryModal, setOpenHistoryModal] = useState();
    const [historyCourse, setHistoryCourse] = useState([]);
    const showHistoryModal = async () => {
        await ApiClient().get('student/history-course').then(res => {
            if (res.status == 200) {
                setHistoryCourse(res.data.history)
            }
        })
        setOpenHistoryModal(true)
    }
    const handleHistoryOk = () => {
        setOpenHistoryModal(false);
    }
    const handleHistoryCancel = () => {
        setOpenHistoryModal(false);
    }
    const items = [
        {
            label: <p onClick={showChangeIFModal}>Thay Đổi Thông Tin</p>,
            key: '0',
        },
        {
            label: <p onClick={showChangePassModal}>Đổi Mật Khẩu</p>,
            key: '1',
        },
        {
            label: <p onClick={showHistoryModal}>Lịch Sử Học Tập</p>,
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label: <Link to='/logout'>Logout</Link>,
            key: '3',
        },
    ];

    return (
        <header>
            <nav className="bg-white px-4 lg:px-6 py-7 dark:bg-gray-100">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center lg:order-2">
                        {email.length < 1
                            ?
                            <Button type="primary" style={{ backgroundColor: 'blue' }}>
                                <Link to='/login'>Login</Link>
                            </Button>
                            :
                            <span>
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    trigger={['click']}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            {email}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </span>
                        }
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    </div>
                </div>
            </nav>
            {/* Change info */}
            <Modal
                title="Thay Đổi Thông Tin Cá Nhân"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}

            >
                <div>
                    <form className="space-y-4 md:space-y-6 mt-4" onSubmit={handleSubmit(onEditSubmit)}>
                        <div>
                            <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Full Name</label>
                            <input type="text" {...register('fullname')} placeholder="Enter Full Name" name="fullname" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Phone</label>
                            <input type="text" {...register('phone')} placeholder="Enter Phone" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Day Of Birth</label>
                            <input type="date" {...register('dob')} id="dob" name='dob' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Sex</label>
                            <Radio.Group onChange={onChange} id="sex" name='sex'>
                                <Radio value={'male'}>Male</Radio>
                                <Radio value={'female'}>Female</Radio>
                                <Radio value={'other'}>Other</Radio>
                            </Radio.Group>
                        </div>
                        <div>
                            <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Avatar</label>
                            <input type="file" accept='image/*' name='file' onChange={handleChangeFile} />
                        </div>
                        <button type="submit" onClick={() => hiddenModal()} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                    </form>
                </div>
            </Modal>
            {/* Change Password */}
            <Modal
                title="Thay Đổi Mật Khẩu"
                open={openPassword}
                onOk={handleOkPassword}
                onCancel={handleCancelPassword}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}

            >
                <div>
                    <form className="space-y-1 md:space-y-6 mt-4 mb-10" onSubmit={handleSubmit(onPasswordSubmit)}>
                        <div>
                            <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Mật Khẩu Cũ</label>
                            <input type="password" {...register('old_password')} placeholder="Nhập Mật Khẩu Cũ" name="old_password" id="faq_question" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Mật Khẩu Mới</label>
                            <input type="password" {...register('password')} placeholder="Nhập Mật Khẩu Mới" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Gửi</button>
                    </form>
                </div>
            </Modal>
            {/* HISTORY MODAL */}
            <Modal
                title="Lịch Sử Khoá Học"
                open={openHistoryModal}
                onOk={handleHistoryOk}
                onCancel={handleHistoryCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}

            >
                <div>
                    {historyCourse.map(history => (
                        <p>{history.course_id}</p>
                    ))}

                </div>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </header>
    )
}
export default Header;