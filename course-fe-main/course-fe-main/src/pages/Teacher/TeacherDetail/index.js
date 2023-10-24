import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { Layout, Menu, Button, theme, Descriptions, Badge, Space, Table, Modal, Avatar } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import {

    ArrowLeftOutlined
} from '@ant-design/icons';
import { ApiClient } from '../../../interceptors/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react"


const { Header, Sider, Content } = Layout;
const TeacherDetails = () => {
    const { slug } = useParams();
    const [course, setCourse] = useState([]);
    const [dataLecture, setDataLecture] = useState();
    const [dataStudent, setDataStudent] = useState([]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        await ApiClient().get(`teacher/course-detail/${slug}`).then(res => {
            setCourse(res.data.courseDetail);
            setDataLecture(res.data.lecture);
            setDataStudent(res.data.studentList);
        })
    }
    const items = [
        {
            key: 'course_id',
            label: 'ID Khoá Học',
            children: `${course.course_id}`,
        },
        {
            key: 'course_name',
            label: 'Tên Khoá Học',
            children: `${course.course_name}`,
        },
        {
            key: 'subject_id',
            label: 'Thể Loại Môn Học',
            children: `${course.sub_id} - ${course.sub_name}`,
        },

        {
            key: 'dateStart',
            label: 'Ngày Bắt Đầu',
            children: `${course.dateStart}`,
        },
        {
            key: 'course_price',
            label: 'Giá Khoá Học',
            children: `${course.course_price} VND`,
        },
        {
            key: 'dateEnd',
            label: 'Ngày Kết Thúc',
            children: `${course.dateEnd}`,
        },
        {
            key: 'course_image',
            children: course.course_image ? <img width={300} height={100} src={`http://localhost:8081/uploads/courses/${course.course_id}/${course.course_image}`} /> : ''
        },
        {
            key: 'course_status',
            label: 'Trạng Thái Khoá Học',
            children: course.course_status ? <Badge status="success" text='Public' /> : <Badge status="error" text='Private' />,
        },
    ];
    const columns = [

        {
            title: 'ID Bài Giảng',
            dataIndex: 'lecture_id',
            key: 'lecture_id'
        },
        {
            title: 'Tên Bài Giảng',
            render: (record) => <Link to={`/teacher/course/lecture/${record.lecture_slug}`}>{record.lecture_name}</Link>
        },
        {
            title: 'Nội Dung Bài Giảng',
            dataIndex: 'lecture_content',
            key: 'lecture_content'
        },
        {

            title: 'Link Tài Liệu',
            dataIndex: 'lecture_document',
            key: 'lecture_document'

        },
        {
            title: 'Người Tạo',
            dataIndex: 'teacher_email',
            key: 'teacher_email'
        },
        {
            title: 'Action',
            key: 'Action',
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'red' }} data-id={record._id} data-name={record.lecture_name} onClick={showDelModal} >Xoá</Button>
                    {/* <Button type="primary" style={{ backgroundColor: 'green' }} data-id={record._id} >Sửa</Button> */}
                </Space>
            ),
        },
    ];
    const StudentColumns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Ngày Tham Gia',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: 'Action',
            key: 'Action',
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'red' }} data-id={record._id} data-email={record.email} onClick={showDelStudentModal} >Xoá</Button>
                </Space>
            ),
        },
    ];
    //  -------------------------------------------DELETE MODAL---------------------------------
    const [delOpen, setDelOpen] = useState(false);
    const [lecture, setLecture] = useState([]);
    const showDelModal = (e) => {
        const data =
        {
            name: e.currentTarget.dataset.name,
            _id: e.currentTarget.dataset.id
        }

        setLecture(data);
        setDelOpen(true)
    }
    const handleDelOk = () => {
        delLecture(lecture);
        setDelOpen(false)

    }
    const handleDelCancel = () => {
        setDelOpen(false)
    }
    const delLecture = async (lecture) => {
        await ApiClient().get(`teacher/delete-lecture/${lecture._id}`).then(res => {
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
    // ---------------------------------------DELETE STUDENT------------------------
    const [delStudentOpen, setDelStudentOpen] = useState(false);
    const [dataDel, setDataDel] = useState([]);
    const showDelStudentModal = (e) => {
        const dataStudent = {
            email: e.currentTarget.dataset.email,
            _id: e.currentTarget.dataset.id
        }
        setDelStudentOpen(true);
        setDataDel(dataStudent);
    }
    const handleDelStudentOk = () => {
        deleteStudent(dataDel);
        setDelStudentOpen(false);
    }
    const handleDelStudentCancel = () => {
        setDelStudentOpen(false)
    }
    const deleteStudent = async (dataDel) => {
        await ApiClient().get(`teacher/delete-student/${dataDel._id}`).then(res => {
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
    // ----------------------------------ADD MODAL----------------------------
    const [showLecture, setShowLecture] = useState(false);
    const [showStudentList, setShowStudentList] = useState(false);
    const handleShowLecture = async () => {
        setShowLecture(true);
        if (dataLecture.length == 0) {
            toast.error('Không tìm thấy bài giảng !', {
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
    }
    const handleShowList = async () => {
        setShowStudentList(true);
    }
    const [addOpen, setAddOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const showModalAddLecture = () => {
        setAddOpen(true)
    }
    const handleAddOk = async () => {
        setAddOpen(false);
    };
    const handleAddCancel = () => {
        setAddOpen(false);
    }
    const onAddSubmit = async (data) => {
        const data_upload = {
            ...data, ...{
                course_id: course.course_id,
            }
        }
        await ApiClient().post('teacher/course/create-lecture', data_upload).then(res => {
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
                getData();
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
            }
        })
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
                    <div>
                        <Descriptions title={`Thông tin khoá học ${course.course_name}`} column={1} items={items} />
                        <Space size="middle">
                            <Button type="primary" style={{ backgroundColor: 'blue' }} onClick={handleShowLecture}>Xem Bài Giảng</Button>
                            <Button type="primary" style={{ backgroundColor: 'blue' }} onClick={handleShowList}>Danh Sách Học Viên</Button>
                        </Space>
                    </div>
                    <div>
                        {showLecture
                            ?
                            <div className='mt-10'>
                                <Button className='mb-4' type="primary" style={{ backgroundColor: 'green' }} onClick={showModalAddLecture}>Thêm Bài Giảng</Button>
                                <div>
                                    <Table columns={columns} dataSource={dataLecture} rowKey={(record) => record.course_id} />
                                </div>
                            </div>

                            :
                            ''}
                        {showStudentList
                            ?
                            <div className='mt-10'>
                                <div>
                                    <Table columns={StudentColumns} dataSource={dataStudent} rowKey={(record) => record.course_id} />
                                </div>
                            </div>

                            :
                            ''}
                    </div>
                </Content>
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
                                <label htmlFor="lecture_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">ID Bài Giảng</label>
                                <input type="text" {...register("lecture_id")} placeholder="Nhập ID Bài Giảng" name="lecture_id" id="lecture_id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="lecture_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Tên Bài Giảng</label>
                                <input type="text" {...register("lecture_name")} placeholder="Nhập Tên Bài Giảng" name="lecture_name" id="lecture_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="lecture_content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nội Dung Bài Giảng</label>
                                <textarea type="text" {...register("lecture_content")} placeholder="Nhập Nội Dung Bài Giảng" name="lecture_content" id="lecture_content" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="lecture_document" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Link Tài Liệu</label>
                                <input type="text" {...register("lecture_document")} placeholder="Nhập Link Tài Liệu" name="lecture_document" id="lecture_document" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            {/* <div>
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Avatar</label>
                    <input type="file" {...register("image")} name="image" id="image" required="" />
                </div> */}
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                        </form>
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
                    </div>
                </Modal>
                <Modal
                    open={delOpen}
                    onOk={handleDelOk}
                    onCancel={handleDelCancel}
                    okButtonProps={{ style: { backgroundColor: 'red' } }}
                >
                    <p><strong>{lecture.name}</strong> sẽ bị xoá vĩnh viễn.
                        <br />
                        Bạn có muốn tiếp tục ?</p>
                </Modal>
                <Modal
                    open={delStudentOpen}
                    onOk={handleDelStudentOk}
                    onCancel={handleDelStudentCancel}
                    okButtonProps={{ style: { backgroundColor: 'red' } }}
                >
                    <p><strong>{dataDel.email}</strong> sẽ bị xoá khỏi khoá học.
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
    )
};

export default TeacherDetails;