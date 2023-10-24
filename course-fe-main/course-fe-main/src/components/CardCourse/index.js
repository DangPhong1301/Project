import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { ApiClient } from '../../interceptors/axios';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import React from "react"


const { Meta } = Card;
function CardCourse() {
    const [allCourse, setAllCourse] = useState([]);
    const [historyCourse, setHistoryCourse] = useState([]);
    useEffect(() => {
        getCourseData();
    }, []);
    const getCourseData = async () => {
        await ApiClient().get('student/all-course').then(res => {
            setAllCourse(res.data.courses);
            setHistoryCourse(res.data.history);
        })
    }
    const nav = useNavigate();
    return (
        <div style={{ width: '90%', margin: 'auto' }}>
            <Row gutter={16}>
                {allCourse.map((course) => (
                    <Col span={8} key={course.course_id} onClick={() => nav(`/${course.course_slug}`)}>
                        <Card bordered={false} hoverable>
                            <img style={{ width: '400px', height: '400px', marginBottom: '20px' }} src={`http://localhost:8081/uploads/courses/${course.course_id}/${course.course_image}`} alt="" />
                            <strong>{course.course_name}</strong>
                            <br />
                            <br />
                            <strong>Giá: {course.course_price} VND</strong>
                            <br />
                            <div style={{ float: 'right' }}>
                                <Button type='primary' style={{ backgroundColor: 'green' }} >Tham Gia Ngay</Button>
                            </div>
                        </Card>
                    </Col>
                ))}

            </Row>
        </div>

    )
}

export default CardCourse;