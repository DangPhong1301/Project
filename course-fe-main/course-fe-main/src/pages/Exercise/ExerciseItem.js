import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import React from "react"
import folderIcon from "../../icon/icon-folder.png"
import stackIcon from "../../icon/icon-stack.png"
import arrowIcon from "../../icon/icon-arrow.png"

const ExerciseItem = (props) => {
    const { lecture_name, _id, lecture_slug, lecture_content } = props
    const nav = useNavigate()
    const handleDoingExercise = () => {
        nav(`/doing-exercise/${lecture_slug}`)
    }
    return (
        <div className="bg-neutral-100 p-7 flex flex-col w-1/2 mt-10 gap-5 border border-solid border-neutral-300 rounded-md ">
            <div className="flex gap-3">
                <img  className = " w-8 h-8" src = {folderIcon}/>
                <span className="text-2xl font-bold font-PlaypenSans">{lecture_name}</span>
            </div>
            {/* <span className="italic text-xl">Mô tả: {lecture_content}</span> */}
            <div className="flex justify-between">
                <Button className="bg-neutral-100 text-black px-20 py-6 w-1/3 flex items-center justify-center border-solid boder border-black rounded-3xl font-PlaypenSans gap-2"
                    type="primary" >
                    <img src = {stackIcon}  className="w-7 h-7"/>
                    <p>Xem bài giảng</p>
                </Button>
                <Button
                    className="bg-neutral-100 text-black px-20 py-6 w-1/3 flex items-center justify-center border-solid border border-black rounded-3xl font-PlaypenSans gap-3"
                    type="primary" 
                    onClick={handleDoingExercise}
                >
                    <p>Làm bài ngay</p>
                    <img src = {arrowIcon} className="w-7 h-7 "/>
                </Button>
            </div>
        </div>
    )
}

export default ExerciseItem