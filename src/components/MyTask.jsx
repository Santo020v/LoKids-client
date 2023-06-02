import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const MyTask = () => {
    const [data, setData] = useState([]);
    const teacherId = localStorage.getItem("teacherId")

    const getData = async () => {
        const url = "http://localhost:3000/api/getTaskByTeacherId";
            await axios.post(url, {teacherId})
			.then((response) => {
                setData(response.data.task);
			})
    };

    useEffect(() => {
        getData();
    }, []);


    const goToTask = (link, id) => {
        console.log(id);
        localStorage.setItem("idTask", id);
        window.location.replace(link);
    };

    const navigate = useNavigate();


	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("teacherId");
		navigate('/');
	};

	const handleGoToTaskList = () => {
		navigate('/home-teacher');
	};

	return (
        
		<div className={styles.main_container}>
            <nav className={styles.navbar}>
				<img src={require('./asset/image-removebg-preview (4) copy 2.png')} className={styles.logo} alt="logo"/> 
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
                        <Card className={styles.listofTask_student} style={{ width: '16rem', marginRight: '30px', height: 'auto', border: '4px solid #3bb19b'}}  key={i._id} onClick={() => goToTask(i.link, i._id)}>
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

export default MyTask;