import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { useRef } from "react";

const AddHomework = () => {
    const [data1, setData1] = useState([]);
    const {_id} = useParams();
    const [tasks, setArray] = useState([]);
    const [homework, setHomework] = useState([]);
    const checkbox = useRef();
    const isDoneTask = false;

    const navigate = useNavigate();

    const getData = async () => {
        const url = "http://localhost:3000/api/getAllTask";
            await axios.get(url)
			.then((response) => {
                setData1(response.data);
			})
    };
    
    useEffect(() => {
        getData();
    }, []);

    const tasksall = data1.task;
    console.log(tasksall)

    const addTaskToHomework = (event, idTask, teacherId) => {
        const a = event.target.checked;
        if(a){
            const isFound = tasks.some(element => {
            if(element.idTask === idTask) {
                return true;
            }else{
                return false;
            }
            });
            if(isFound === false) {
                setArray([...tasks, {idTask, isDoneTask, teacherId}]);
            } 
        }
        else{
            const index = tasks.findIndex(element => element.idTask === idTask)
            console.log(index)
            if (index !== -1) {
                tasks.splice(index, 1);
                setArray(tasks);
            }
        }
    
    };
    console.log(tasks);

    const dateNow = new Date();
    const date = `${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}`;
    const isDone = false;
    const score = 0;
    const studentId = _id;
    
    const addHomework = async () => {
        const url = "http://localhost:3000/api/addHomeworkToStudent";
        if (tasks.length > 0){
            navigate(`/my-students/${_id}`);
            window.location.reload();
            await axios.post(url, {tasks, studentId, date, isDone, score})
            .then((response) => {
                setHomework(response.data);
            });
        }
        else{
            console.log("No")
        }
        
	};

    useEffect(()=>{
        console.log(tasks);
      },[tasks]);


    const goToTask = (link) => {
        window.location.replace(link);
    };

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
				<img src={require('./asset/image-removebg-preview (4) copy 2.png') } alt="logo" className={styles.logo} />
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

            <button onClick={addHomework} className={styles.button_hw}>
                Додати домашнє завдання
            </button> 
           
            <h4>Психологія</h4>
            <div className={styles.psyhologyTask}>
                {tasksall?.map((i)=>{
                    if(i.type === "Psyhology" ) {
                         return(
                        <Card style={{ width: '16rem', marginRight: '30px', height: 'auto', border: '4px solid #3bb19b'}}  className={styles.listofTask} key={i._id} value={i._id} >
                            <Card.Img variant="top" style={{marginTop: '20px', marginLeft: '10%', width: '80%', height: '160px', borderRadius: '10px'}} src={require('./asset/p1.jpg')} className={styles.img_task} alt="card img"/>
                            <Card.Body>
                                <Card.Title>{i.title} </Card.Title>
                                <Card.Text onClick={() => goToTask(i.link)}>
                                {i.text} 
                                </Card.Text>
                                <input type="checkbox" value={i._id} onChange={(e) => addTaskToHomework(e, i._id, i.teacherId)} ref={checkbox}></input>
                            </Card.Body>
                        </Card>
                    )
                    }
                })}
            </div>

            <h4>Логопедія</h4>
            <div className={styles.logopedyTask}>
                {tasksall?.map((i)=>{
                    if(i.type === "SpeechTherapy" ) {
                            return(
                                <Card style={{ width: '16rem', marginRight: '30px', height: 'auto', border: '4px solid #3bb19b'}}  className={styles.listofTask} key={i._id} >
                                    <Card.Img variant="top" style={{marginTop: '20px', marginLeft: '10%', width: '80%', height: '160px', borderRadius: '10px'}} src={require('./asset/l1.jpg')} className={styles.img_task} alt="card img"/>
                                    <Card.Body>
                                        <Card.Title>{i.title} </Card.Title>
                                        <Card.Text onClick={() => goToTask(i.link)}>
                                        {i.text} 
                                        </Card.Text >
                                        <input type="checkbox" value={i._id} onChange={(e) => addTaskToHomework(e, i._id, i.teacherId)} ref={checkbox}></input>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    })}
            </div>
            
		</div>

	);

};

export default AddHomework;