import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Moment from 'moment';
import { useNavigate } from "react-router-dom";

const MyHomework = () => {
    const [data1, setData1] = useState([]);
    const _id = localStorage.getItem("studentId");

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

    
    const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
        localStorage.removeItem("studentId");
		navigate('/');
	};

	const handleGoToTaskList = () => {
		navigate('/all-task');
	};

    const handleGoBack = () => {
		navigate('/home');
	};

    const goToListOfTaskHW = (id) => {
        localStorage.setItem("homeworkId", id);
        navigate(`/homework-task`);
    };

    console.log(data1);
    let num = 0;
	return (
		<div className={styles.main_container}>
            <nav className={styles.navbar}>
                <img src={require('./asset/image-removebg-preview (4) copy 2.png')} className={styles.logo} alt="logo"/>
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

			<h3>Моє домашнє завдання</h3>

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

export default MyHomework;
