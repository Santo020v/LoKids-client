import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const Homework = () => {
    const [data, setData] = useState([]);
    const idHomework = localStorage.getItem("homeworkId")

    const getData = async () => {
        const url = "http://localhost:3000/api/getHomewworkById";
            await axios.post(url, {idHomework})
			.then((response) => {
                setData(response.data.task);
			})
    };

    useEffect(() => {
        getData();
    }, []);

    const goToTask = (link) => {
        window.location.replace(link);
    };

    const navigate = useNavigate();


	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("teacherId");
		navigate('/');
	};
	const handleGoToStudentList = () => {
		navigate('/my-students');
	};

	const handleGoToTaskList = () => {
		navigate('/home-teacher');
	};

	return (
        
		<div className={styles.main_container}>
            <nav className={styles.navbar}>
				<img src={require('./asset/image-removebg-preview (4) copy 2.png')} className={styles.logo} alt="logo"/>
				<button className={styles.white_btn} onClick={handleGoToStudentList}>
					Мої студенти
				</button>
				<button className={styles.white_btn} onClick={handleGoToTaskList}>
					Головне меню
				</button>
				<button className={styles.white_btn} onClick={handleLogout}>
					Вихід
				</button>
			</nav>

            <div className={styles.psyhologyTask}>
                {data?.map((i)=>{
                         return(
                        <Card style={{ width: '16rem', marginRight: '30px', height: 'auto', border: '4px solid #3bb19b'}}  className={styles.listofTask} key={i._id} onClick={() => goToTask(i.link)}>
                            <Card.Img variant="top"  style={{marginTop: '20px', marginLeft: '10%', width: '80%', height: '160px', borderRadius: '10px'}} src={require('./asset/p1.jpg')} className={styles.img_task} alt="task" />
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

export default Homework;