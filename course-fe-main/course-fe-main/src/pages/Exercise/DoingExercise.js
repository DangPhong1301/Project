import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { ApiClient } from "../../interceptors/axios";
import React from "react"

const DoingExercise = () => {
    const {slug} = useParams()
    const [ listQuestions, setListQuestions ] = useState([])
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        await ApiClient().get(`student/course/lecture-detail/${slug}`).then(res => {
            setListQuestions(res.data.exercises)
            console.log(res.data.exercises);
        })
    }
    return (
        <div className="flex flex-col items-center">
            <h1>BÀI TẬP {slug}</h1>
        </div>
    )
}

export default DoingExercise
