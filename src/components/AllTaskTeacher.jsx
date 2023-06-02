import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const AllTaskTeacher = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState({ type: "", title: "", text: "", link: ""});
    const teacherId = localStorage.getItem("teacherId");
    const user = localStorage.getItem("studentId");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getData = async () => {
        const url = "https://lokids-server.onrender.com/api/getAllTask";
            await axios.get(url)
			.then((response) => {
                setData(response.data);
			})
    };
    
    useEffect(() => {
        getData();
    }, []);

    const allTask = data.task;

    const goToTask = (link) => {
        window.location.replace(link);
    };

    const navigate = useNavigate();


	const handleLogout = () => {
        if (teacherId){
            localStorage.removeItem("token");
            localStorage.removeItem("teacherId");
            navigate("/")
            }
        else if(user){
            localStorage.removeItem("token");
            localStorage.removeItem("studentId");
            navigate("/")
        }
	};

	const handleGoToTaskList = () => {
        if (teacherId){
            navigate('/home-teacher');
        }
        else if(user){
            navigate("/home")
        }
		
	};

    const goToMyTaskList = () => {
        navigate('/my-task');
	};

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
		setData1({ ...data1, [input.name]: input.value });
	};

    console.log(data1);


    const handleSubmit = async (e) => {
        console.log(data);
        console.log(teacherId);			
        e.preventDefault();
		try {
            const url = "https://lokids-server.onrender.com/api/addTask";
             await axios.post(url, {data1, teacherId})
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


	return (
        
		<div className={styles.main_container}>
            <nav className={styles.navbar}>
				<img src={require('./asset/image-removebg-preview (4) copy 2.png')} className={styles.logo} />
				<button className={styles.white_btn} onClick={handleGoToTaskList}>
					Головне меню
				</button>

                <button className={styles.white_btn} onClick={goToMyTaskList}>
					Мої завдання
				</button>

				<button className={styles.white_btn} onClick={handleLogout}>
					Вихід
				</button>
			</nav>

            <button className={styles.addtask_btn} variant="primary" onClick={handleShow}>Додати завдання</button>

            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                <Modal.Title>Додати власне завдання</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <h6>Виберіть тип завдання</h6>
                        <label htmlFor="psyhology" className={styles.checkbox}>
                            <input
                                type="radio"
                                name="type"
                                id="psyhology"
                                value="Psyhology"
                                checked={data1.type === "Psyhology"}
                                onChange={handleChange}/>            Психологія</label>

                      
                        <label htmlFor="speechtherapy">
                        <input
                            type="radio"
                            name="type"
                            id="speechtherapy"
                            value="SpeechTherapy"
                            checked={data1.type === "SpeechTherapy"}
                            onChange={handleChange}
                        />             Логопедія</label>
                        
                        <div className={styles.title_container}>
                             <label htmlFor="title">Вкажіть назву завдання</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Веселі м'ячики"
                                onChange={handleChange}
                                value={data1.title}
                                required
                                className={styles.input}
                            />
                        </div>
                       
                        <div className={styles.text_container}>
                            <label htmlFor="textOfTask">Опишіть суть завдання</label>
                            <input
                                type="text"
                                name="text"
                                id="textOfTask"
                                value={data1.text}
                                placeholder="Знайди усі букви Р"
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        
                       <div className={styles.link_container}>
                         <label htmlFor="linkOfTask">Вставте посилання на завдання</label>
                        <input
                            type="text"
                            name="link"
                            id="linkOfTask"
                            placeholder="https://learningapps.org/view2750168"
                            onChange={handleChange}
                            value={data1.link}
							required
                            className={styles.input}
                        />
                       </div>
                      
                        

                    {error && <div className={styles.error_msg}>{error}</div>}  
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрити
                </Button>
                <button variant="primary" onClick={handleSubmit} className={styles.button_addTask}>
                    Додати завдання
                </button>
                </Modal.Footer>
            </Modal>

            <h4>Психологія</h4>
            <div className={styles.psyhologyTask}>
                {allTask?.map((i)=>{
                    if(i.type === "Psyhology" ) {
                         return(
                        <Card style={{ width: '16rem', marginRight: '30px', height: 'auto', border: '4px solid #3bb19b'}}  className={styles.listofTask} key={i._id} onClick={() => goToTask(i.link)}>
                            <Card.Img variant="top"  style={{marginTop: '20px', marginLeft: '10%', width: '80%', height: '160px', borderRadius: '10px'}} src={require('./asset/p1.jpg')} className={styles.img_task} />
                            <Card.Body>
                                <Card.Title>{i.title} </Card.Title>
                                <Card.Text>
                                {i.text} 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                    }
                })}
            </div>

            <h4>Логопедія</h4>
            <div className={styles.logopedyTask}>
                {allTask?.map((i)=>{
                    if(i.type === "SpeechTherapy" ) {
                            return(
                                <Card style={{ width: '16rem', marginRight: '30px', height: 'auto', border: '4px solid #3bb19b'}}  className={styles.listofTask} key={i._id} onClick={() => goToTask(i.link)}>
                                    <Card.Img variant="top"  style={{marginTop: '20px', marginLeft: '10%', width: '80%', height: '160px', borderRadius: '10px'}} src={require('./asset/l1.jpg')} className={styles.img_task} />
                                    <Card.Body>
                                        <Card.Title>{i.title} </Card.Title>
                                        <Card.Text>
                                        {i.text} 
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                    }
                    })}
            </div>

           
		</div>
        
	);
};

export default AllTaskTeacher;
