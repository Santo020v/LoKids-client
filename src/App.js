import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/Registration";
import Login from "./components/Login";
import MainTeacher from "./components/MainTeacher";
import Main from "./components/Main";
import HomePage from "./components/HomePage";
import AllTask from "./components/AllTask";
import MyHomework from "./components/MyHomework";
import MyStudents from "./components/MyStudent";
import StudentHomework from "./components/StudentHomework";
import AddHomework from "./components/AddHomework";
import Task1 from "./task/task1";
import Task2 from "./task/task2";
import Task3 from "./task/task3";
import Homework from "./components/Homework";
import MyHomeworkTask from "./components/MyHomeworkTask";
import AllTaskTeacher from "./components/AllTaskTeacher";
import MyTask from "./components/MyTask";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" exact element={<HomePage></HomePage>}></Route> 
      {user && <Route path="/home-teacher" exact element={<MainTeacher></MainTeacher>}></Route>}
      {user && <Route path="/home" exact element={<Main></Main>}></Route>}
      <Route path="/signup" exact element={<SignUp></SignUp>}></Route> 
      <Route path="/login" exact element={<Login></Login>}></Route>
      <Route path="/task1" exact element={<Task1></Task1>}></Route>
      <Route path="/task2" exact element={<Task2></Task2>}></Route>
      <Route path="/task3" exact element={<Task3></Task3>}></Route>
      <Route path="/my-task" exact element={<MyTask></MyTask>}></Route>
      <Route path="/all-task" exact element={<AllTask></AllTask>}></Route> 
      <Route path="/all-task-teacher" exact element={<AllTaskTeacher></AllTaskTeacher>}></Route> 
      <Route path="/my-homework" exact element={<MyHomework></MyHomework>}></Route>
      <Route path="/homework-task" exact element={<MyHomeworkTask></MyHomeworkTask>}></Route>
      <Route path="/my-students" exact element={<MyStudents></MyStudents>}></Route>
      <Route path="/my-students" exact element={<MyStudents></MyStudents>}></Route>
      <Route path={"/my-students/:_id"}  exact element={<StudentHomework></StudentHomework>}></Route>
      <Route path={"/my-students/:_id/add-homework"}  exact element={<AddHomework></AddHomework>}></Route>
      <Route path={"/my-students/:_id/homework"}  exact element={<Homework></Homework>}></Route>
      <Route path="/home" exact element={<Navigate replace to="/"></Navigate>}></Route>
      <Route path="/my-students" exact element={<Navigate replace to="/"></Navigate>}></Route>
      <Route path="/home-teacher" exact element={<Navigate replace to="/"></Navigate>}></Route>
    </Routes>
  );
}

export default App;
