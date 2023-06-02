import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const MyStudents = () => {
    const teacherId = localStorage.getItem("teacherId");
    const [data1, setData1] = useState([]);
    

    const getData = async () => {
        const url = "http://localhost:3000/api/getStudents";
            await axios.post(url, {teacherId})
			.then((response) => {
                setData1(response.data);
			})
    };
    
    useEffect(() => {
        getData();
    }, []);

    const dataUser = data1.users;

    const navigate = useNavigate();
    const [data, setData] = useState({ email: ""});
    const [show, setShow] = useState(false);
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
        localStorage.removeItem("teacherId");
		navigate('/');
	};

	const handleGoToTaskList = () => {
		navigate('/all-task-teacher');
	};

    const handleGoBack = () => {
		navigate('/home-teacher');
	};

    const addStudent = async (e) => {
        console.log(data);
        console.log(teacherId);			
        e.preventDefault();
		try {
            const url = "http://localhost:3000/api/studentAdd";
             await axios.post(url, {data, teacherId})
			.then((response) => {
                console.log(response.data);
                handleClose();
                window.location.reload();
			})
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

            <div className={styles.main}>
                
                    <button variant="primary" onClick={handleShow} className={styles.addStudent}>
                        Додати студента
                    </button>
                    <h3>Мої студенти</h3>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Введіть електронну адресу учня</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}></input>

                            {error && <div className={styles.error_msg}>{error}</div>}  
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Закрити
                        </Button>
                        <Button variant="primary" onClick={addStudent}>
                            Додати студента
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
            {dataUser?.map((i)=>{
                return(
                    <div className={styles.listofstudents} key={i._id} >
                        <Link to={`/my-students/${i._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <div className={styles.itemList}>
                                {i.firstName} {i.lastName}
                            </div>
                        </Link>
                    </div>
                )
            })}
           
           
		</div>
	);
};

export default MyStudents;