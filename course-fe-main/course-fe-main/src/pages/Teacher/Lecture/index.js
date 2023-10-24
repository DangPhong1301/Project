import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Descriptions, Radio, Space, Table, Modal } from 'antd';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { ApiClient } from "../../../interceptors/axios";
import { useForm } from "react-hook-form";
import React from "react"


const { Header, Content } = Layout;

function LectureDetail() {
    const { slug } = useParams();
    // console.log(slug);
    const [lectureData, setLectureData] = useState([]);
    const [exerciseData, setExerciseData] = useState([]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        await ApiClient().get(`teacher/course/lecture-detail/${slug}`).then(res => {
            setLectureData(res.data.lecture);
            setExerciseData(res.data.exercise);
            console.log(res.data);
        })
    }
    const items = [
        {
            key: 'course_id',
            label: 'ID Khoá Học',
            children: `${lectureData.course_id}`,
        },
        {
            key: 'lecture_name',
            label: 'Tên Bài Giảng',
            children: `${lectureData.lecture_name}`,
        },
        {
            key: 'lecture_content',
            label: 'Nội Dung Bài Giảng',
            children: `${lectureData.lecture_content}`,
        },
        {
            key: 'lecture_document',
            label: 'Tài Liệu Tham Khảo',
            children: `${lectureData.lecture_document}`,
        },
        {
            label: 'Danh Sách Bài Tập',
        }

    ];
    const columns = [
        {
            title: 'Tên Bài Tập',
            dataIndex: 'ex_name',
            key: 'ex_name'
        },
        {
            title: 'Câu Hỏi',
            key: 'ex_question',
            render: (record) => {
                if (record.ex_question.length < 1) {
                    return <div>Khong co cau hoi</div>
                }
                else {
                    const data_questions = record.ex_question;
                    return data_questions.map((data) => <div key={data}>
                        <p key={data}>{data.question_name}</p>
                        <br />
                        <br />
                        <br />
                    </div>)
                }
            }
        },
        {
            title: 'Nội Dung Câu Hỏi',
            key: 'question_name',
            render: (record) => {
                const data_questions_1 = record.ex_question;
                // console.log(data_questions_1.question_name);
                return data_questions_1.map((data_1) => <div>
                    <p key={data_1.question_a}>A. {data_1.question_content.question_a}</p>
                    <p key={data_1.question_b}>B. {data_1.question_content.question_b}</p>
                    <p key={data_1.question_c}>C. {data_1.question_content.question_c}</p>
                    <p key={data_1.question_d}>D. {data_1.question_content.question_d}</p>
                    <p className="mb-4"></p>
                </div>)
            }
        },
        {
            title: 'Đáp Án',
            key: 'question_content',
            render: (record) => {
                const data_answers = record.ex_question;
                return data_answers.map((data_answer) => <div>
                    <p key={data_answer.question_a}>A. {data_answer.question_content.flag_a == 0 ? 'Sai' : 'Đúng'}</p>
                    <p key={data_answer.question_b}>B. {data_answer.question_content.flag_b == 0 ? 'Sai' : 'Đúng'}</p>
                    <p key={data_answer.question_c}>C. {data_answer.question_content.flag_c == 0 ? 'Sai' : 'Đúng'}</p>
                    <p key={data_answer.question_d}>D. {data_answer.question_content.flag_d == 0 ? 'Sai' : 'Đúng'}</p>
                    <p className="mb-4"></p>
                </div>)
            }
        },
        {
            title: 'Action',
            key: 'Action',
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'red' }} data-id={record._id} data-name={record.ex_name} onClick={showDelModal}>Xoá</Button>
                    {/* <Button type="primary" style={{ backgroundColor: 'green' }} data-id={record._id} >Sửa</Button> */}
                    <Button type="primary" style={{ backgroundColor: 'blue' }} data-id={record._id} onClick={showAddQuestion}>Thêm Câu Hỏi</Button>
                </Space>
            ),
        },
    ];
    // -----------------------------------------ADD EXERCISE MODAL ------------------------------
    const [addOpen, setAddOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const showAddModal = () => {
        setAddOpen(true);
    }
    const handleAddOk = () => {
        setAddOpen(false)
    }
    const handleAddCancel = () => {
        setAddOpen(false)
    }
    const onAddSubmit = async (data) => {
        const data_upload = {
            ...data, ...{
                lecture_id: lectureData.lecture_id
            }
        }
        await ApiClient().post('teacher/course/lecture-detail/create-exercise', data_upload).then(res => {
            if (res.status != 200) {
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
            } else {
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
                handleAddOk();
                getData();
            }
        })
    }
    // ------------------------------------------ADD QUESTION MODAL-------------------------------
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);
    const [_id, setId] = useState();
    const showAddQuestion = (e) => {
        const _id = e.currentTarget.dataset.id
        setAddQuestionOpen(true);
        setId(_id);
    }
    const handleAddQuestionCancel = () => {
        setAddQuestionOpen(false);
    };
    const handleAddQuestionOk = () => {
        setAddQuestionOpen(false);
    }
    const onAddQuestionSubmit = async (data) => {
        const data_upload = {
            question_name: data['question_name'],
            ex_id: _id,
            question_content: {
                question_a: data.question_a,
                flag_a: flag_a,
                question_b: data.question_b,
                flag_b: flag_b,
                question_c: data.question_c,
                flag_c: flag_c,
                question_d: data.question_d,
                flag_d: flag_d
            }
        }
        await ApiClient().post('teacher/course/lecture-detail/create-question', data_upload).then(res => {
            if (res.status != 200) {
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
            } else {
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
                handleAddQuestionOk();
                getData();
            }
        })
    }
    // -----------------------------------------DELETE MODAL --------------------------------
    const [delOpen, setDelOpen] = useState(false);
    const [ex, setEx] = useState([]);
    const showDelModal = (e) => {
        const data = {
            name: e.currentTarget.dataset.name,
            _id: e.currentTarget.dataset.id
        }
        setEx(data);
        setDelOpen(true);
    }
    const handleDelOk = () => {
        delEx(ex);
        setDelOpen(false)
    }
    const handleDelCancel = () => {
        setDelOpen(false)
    }
    const delEx = async (ex) => {
        await ApiClient().get(`teacher/course/lecture/exercise/delete-exercise/${ex._id}`).then(res => {
            if (res.status != 200) {
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
            } else {
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
                getData();
            }
        })
    }
    // --------------------------------------QUIZ----------------------
    const [flag_a, setFlag_a] = useState();
    const [flag_b, setFlag_b] = useState();
    const [flag_c, setFlag_c] = useState();
    const [flag_d, setFlag_d] = useState();
    const onChangeAnswer = (e) => {
        const data = e.target.value;
        switch (data) {
            case 'a':
                setFlag_a(1);
                setFlag_b(0);
                setFlag_c(0);
                setFlag_d(0);
                break;
            case 'b':
                setFlag_a(0);
                setFlag_b(1);
                setFlag_c(0);
                setFlag_d(0);
                break;
            case 'c':
                setFlag_a(0);
                setFlag_b(0);
                setFlag_c(1);
                setFlag_d(0);
                break;
            case 'd':
                setFlag_a(0);
                setFlag_b(0);
                setFlag_c(0);
                setFlag_d(1);
                break;
            default:
                break;
        }
    }
    return (
        <Layout>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div>
                        <Link to={'/teacher'} style={{ marginLeft: '20px' }}><ArrowLeftOutlined /> Back</Link>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}

                >
                    <Descriptions title={`Thông Tin Bài Giảng :  ${lectureData.lecture_name}`} column={1} items={items} />
                    <Button className='mb-4' type="primary" style={{ backgroundColor: 'green' }} onClick={showAddModal}>Thêm Bài Tập</Button>
                    <Table columns={columns} dataSource={exerciseData} rowKey={(record) => record.ex_id} />
                </Content>
                {/* ADD EXERCISE */}
                <Modal
                    open={addOpen}
                    onOk={handleAddOk}
                    onCancel={handleAddCancel}
                    okButtonProps={{ style: { display: 'none' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    width={1000}
                >
                    <div>
                        <form className="space-y-4 md:space-y-6 mt-4" onSubmit={handleSubmit(onAddSubmit)}>

                            <div>
                                <label htmlFor="exercise_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">ID Bài Tập</label>
                                <input type="text" {...register("ex_id")} placeholder="Nhập ID Bài Tập" name="ex_id" id="exercise_id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="exercise_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Tên Bài Tập</label>
                                <input type="text" {...register("ex_name")} placeholder="Nhập Tên Bài Tập" name="ex_name" id="exercise_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                        </form>
                    </div>
                </Modal>
                {/* ADD QUESTION */}
                <Modal
                    open={addQuestionOpen}
                    onOk={handleAddQuestionOk}
                    onCancel={handleAddQuestionCancel}
                    okButtonProps={{ style: { display: 'none' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    width={1000}
                >
                    <div>
                        <form className="space-y-4 md:space-y-6 mt-4" onSubmit={handleSubmit(onAddQuestionSubmit)}>

                            <div>
                                <label htmlFor="question_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Câu Hỏi</label>
                                <input type="text" {...register("question_name")} placeholder="Nhập Tên Câu Hỏi" name="question_name" id="question_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="question_a" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nội Dung Câu Hỏi</label>
                                A.<input type="text" {...register("question_a")} placeholder="Nhập Tên Câu Hỏi" name="question_a" id="question_a" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />

                                B.<input type="text" {...register("question_b")} placeholder="Nhập Tên Câu Hỏi" name="question_b" id="question_b" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />

                                C.<input type="text" {...register("question_c")} placeholder="Nhập Tên Câu Hỏi" name="question_c" id="question_c" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                D.<input type="text" {...register("question_d")} placeholder="Nhập Tên Câu Hỏi" name="question_d" id="question_d" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="answer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Đáp Án Đúng</label>
                                <Radio.Group onChange={onChangeAnswer} id="answer">
                                    <Radio value={'a'}>A</Radio>
                                    <Radio value={'b'}>B</Radio>
                                    <Radio value={'c'}>C</Radio>
                                    <Radio value={'d'}>D</Radio>
                                </Radio.Group>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                        </form>
                    </div>
                </Modal>
                {/* DELETE */}
                <Modal
                    open={delOpen}
                    onOk={handleDelOk}
                    onCancel={handleDelCancel}
                    okButtonProps={{ style: { backgroundColor: 'red' } }}
                >
                    <p><strong>{ex.name}</strong> sẽ bị xoá vĩnh viễn.
                        <br />
                        Bạn có muốn tiếp tục ?</p>
                </Modal>
            </Layout>
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
        </Layout>
    );
}

export default LectureDetail;