import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ExerciseItem from "./ExerciseItem";
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
import { ApiClient } from "../../interceptors/axios";
import { useForm } from "react-hook-form";
import React from "react"


const { Header, Content } = Layout;
const Exercise = () => {
    const { slug } = useParams();
    const [listExercise, SetListExercise] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        await ApiClient().get(`teacher/course-detail/${slug}`).then(res => {
            SetListExercise(res.data.lecture);
            console.log(res.data);
        })
    }

    // console.log(listExercise);
    return (
        <div className="px-20 flex flex-col">
            <div className="text-center mt-20 text-2xl font-bold font-PlaypenSans">DANH SÁCH BÀI TẬP</div>
            {listExercise.map(({ lecture_name, _id, lecture_slug, lecture_content }) => (
                <ExerciseItem
                    key={_id}
                    lecture_name={lecture_name}
                    lecture_slug={lecture_slug}
                    lecture_content={lecture_content}
                />
            ))}
        </div>
    );
}

export default Exercise;