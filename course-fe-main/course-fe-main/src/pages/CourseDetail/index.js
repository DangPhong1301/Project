import { useNavigate, useParams } from "react-router-dom";
import Header from '../../components/Header'
import { useEffect, useState } from "react";
import { ApiClient } from "../../interceptors/axios";
import { Layout, Menu, Button, theme, Descriptions, Badge, Space, Table, Modal, Avatar } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react"

function CourseDetail() {
    const { slug } = useParams();
    const nav = useNavigate();
    const [course, setCourse] = useState([]);
    const [dataLecture, setDataLecture] = useState();

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        await ApiClient().get(`teacher/course-detail/${slug}`).then(res => {
            if (res.status == 200) {
                setCourse(res.data.courseDetail);
                setDataLecture(res.data.lecture);
            }
        })
    }
    const handleRegisterCourse = async () => {
        const token = localStorage.getItem('accessToken')
        const data = {
            course_id: course.course_id
        }
        if (!token) {
            return nav('/login')
        } else if (course.isRegister) {
            return nav(`/learning/${slug}`)
        }
        await ApiClient().post('student/register-course', data).then(res => {
            if (res.status == 200) {
                nav(`/learning/${slug}`)
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
    const handleOpenListExercise = () => {
        const token = localStorage.getItem('accessToken')
        const data = {
            course_id: course.course_id
        }
        if (!token) {
            return nav('/login')
        } else if (course.isRegister) {
            return nav(`/list-exercise/${slug}`)
        }
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
            key: 'dateEnd',
            label: 'Ngày Kết Thúc',
            children: `${course.dateEnd}`,
        },
        {
            key: 'course_price',
            label: 'Giá Khoá Học',
            children: `${course.course_price} VND`,
        },
        {
            key: 'course_image',
            children: course.course_image ? <img width={300} height={100} src={`http://localhost:8081/uploads/courses/${course.course_id}/${course.course_image}`} alt='image' /> : ''
        },
    ];
    return (
        <div>
            <div>
                <Header />
            </div>
            <div style={{ width: '70%', margin: '40px 0px 0px 40px' }}>
                <Descriptions className="text-center" column={1} items={items} />
                {/* {course.isRegister == true
                    ?
                    <Button type="primary" onClick={handleRegisterCourse} style={{ backgroundColor: 'green' }}>Tiếp Tục Học</Button>
                    :
                    <Button type="primary" onClick={handleRegisterCourse} style={{ backgroundColor: 'green' }}>Đăng Ký Ngay</Button>
                } */}
                <Button type="primary" onClick={handleOpenListExercise} style={{ backgroundColor: 'green' }}>Lam Bai Tap</Button>
            </div>
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
    )
}

export default CourseDetail;