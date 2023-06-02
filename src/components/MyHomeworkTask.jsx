import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const MyHomeworkTask = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const idHomework = localStorage.getItem("homeworkId");
    const idStudent = localStorage.getItem("studentId");

    const getData = async () => {
        const url = "http://localhost:3000/api/getHomewworkById";
            await axios.post(url, {idHomework})
			.then((response) => {
                setData(response.data.task);
                setData1(response.data.homework.tasks);
			})
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(data1);

    const goToTask = async (link, idTask, teacherId) => {
        if(teacherId !=undefined) {
            localStorage.setItem("idTask", idTask);
            window.location.replace(link);
            const url = "http://localhost:3000/api/setDoneDataToTask";
            await axios.post(url, {idHomework, idTask, idStudent})
            .then((response) => {
                    console.log(response); })
        }
        else{
            localStorage.setItem("idTask", idTask);
            window.location.replace(link);
        }
        
    };

    const navigate = useNavigate();


	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("studentId");
		navigate('/');
	};
	const handleGoToStudentList = () => {
		navigate('/my-homework');
	};

	const handleGoToTaskList = () => {
		navigate('/home');
	};

	return (
        
		<div className={styles.main_container}>
            <nav className={styles.navbar}>
				<img src={require('./asset/image-removebg-preview (4) copy 2.png')} className={styles.logo} alt="logo"/> 
				<button className={styles.white_btn} onClick={handleGoToStudentList}>
					Моє домашнє завдання
				</button>
				<button className={styles.white_btn} onClick={handleGoToTaskList}>
					Головне меню
				</button>
				<button className={styles.white_btn} onClick={handleLogout}>
					Вихід
				</button>
			</nav>

            <div className={styles.homeworkTask}>
                {data?.map((i)=>{
                         return(
                        <Card className={styles.listofTask_student} style={{ width: '16rem', marginRight: '30px', height: 'auto', border: '4px solid #3bb19b'}}  key={i._id} onClick={() => goToTask(i.link, i._id, i.teacherId)}>
                            <Card.Img style={{marginTop: '20px', marginLeft: '10%', width: '80%', height: '160px', borderRadius: '10px'}} variant="top" src={require('./asset/p1.jpg')} alt="task"/>
                            <Card.Body>
                                <Card.Title>{i.title} </Card.Title>
                                <Card.Text>
                                {i.text} 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
		</div>
        
	);
};

export default MyHomeworkTask;