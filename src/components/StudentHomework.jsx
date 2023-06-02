import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Moment from 'moment';

const StudentHomework = () => {
    const [data1, setData1] = useState([]);
    const {_id} = useParams();

    const getData = async () => {
        const url = `https://lokids-server.onrender.com/api/student/${_id}`;
            await axios.post(url, {_id})
			.then((response) => {
                setData1(response.data);
			})
    };
    
    useEffect(() => {
        getData();
    }, []);

    console.log(data1);

    const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
        localStorage.removeItem("teacherId");
		navigate('/');
	};

    const addHomework = () => {
		navigate(`/my-students/${_id}/add-homework`);
	};

	const handleGoToTaskList = () => {
		navigate('/all-task-teacher');
	};

    const handleGoBack = () => {
		navigate('/home-teacher');
	};

    const goToListOfTaskHW = (id) => {
        localStorage.setItem("homeworkId", id);
        navigate(`/my-students/${_id}/homework`);
    };

    let num = 0;

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
                <img src={require('./asset/image-removebg-preview (4) copy 2.png')} className={styles.logo}  alt="logo"/>
				<button className={styles.white_btn} onClick={handleGoToTaskList}>
					Всі завдання
				</button>
                <button className={styles.white_btn} onClick={handleGoBack}>
					Головне меню
				</button>
				<button className={styles.white_btn} onClick={handleLogout}>
					Вихід
				</button>
            </nav>


                <button onClick={addHomework} className={styles.addHomework}>
                    Додати домашнє завдання
                </button>
                {data1?.map((i)=>{
                return(
                    <div className={styles.listofhomework} key={i._id} >
                            <div className={styles.itemList} onClick={() =>goToListOfTaskHW(i._id)}>
                                <a className={styles.a1}> Homework {num = num+1}</a>
                                <a className={styles.a2}>  {Moment(i.date).format('DD-MM-YYYY')}</a>
                            <div className={styles.a3}><a>{i.score} </a></div>
                        </div>
                            
                    </div>
                )
            })}

		</div>
	);
};

export default StudentHomework;
