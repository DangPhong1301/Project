import './App.css';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import AdminRoute from './routes/AdminRoute';
import TeacherRoute from './routes/TeacherRoute';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import StudentManagement from './pages/Admin/StudentManagement';
import Logout from './components/Logout';
import Teacher from './pages/Teacher';
import Forgot_Password from './pages/Forgot_Password';
import Reset_Password from './pages/Forgot_Password/Reset_Password';
import TeacherManagement from './pages/Admin/TeacherManagement';
import Subject from './pages/Teacher/Subject';
import TeacherDetails from './pages/Teacher/TeacherDetail';
import LectureDetail from './pages/Teacher/Lecture';
import FAQsManagement from './pages/Admin/FAQsManagement';
import CourseDetail from './pages/CourseDetail'
import Learning from './pages/Learning';
import Exercise from './pages/Exercise/Exercise';
import DoingExercise from './pages/Exercise/DoingExercise';
import React from "react"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/reset-password" element={<Reset_Password />} />
        <Route path='/home' element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/:slug" element={<CourseDetail />} />
        <Route path="/learning/:slug" element={<Learning />} />
        <Route path="/list-exercise/:slug" element={<Exercise />} />
        <Route path="/doing-exercise/:slug" element={<DoingExercise />} />
        <Route exact path='/' element={<TeacherRoute />}>
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/teacher/course/:slug" element={<TeacherDetails />} />
          <Route path="/teacher/course/lecture/:slug" element={<LectureDetail />} />
          <Route path="/teacher/subject" element={<Subject />} />
        </Route>
        <Route exact path='/' element={<AdminRoute />}>
          <Route exact path='/admin' element={<Admin />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/teacher-management" element={<TeacherManagement />} />
          <Route path="/faqs-management" element={<FAQsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
