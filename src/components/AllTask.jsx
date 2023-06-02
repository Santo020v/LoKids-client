import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const AllTask = () => {
    const [data, setData] = useState([]);
    const teacher = localStorage.getItem("teacherId");
    const user = localStorage.getItem("studentId")

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
        if (teacher){
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
        if (teacher){
            navigate('/home-teacher');
        }
        else if(user){
            navigate("/home")
        }
		
	};

    

	return (
        
		<div className={styles.main_container}>
            <nav className={styles.navbar}>
				<img src={require('./asset/image-removebg-preview (4) copy 2.png')} className={styles.logo} />
				<button className={styles.white_btn} onClick={handleGoToTaskList}>
					Головне меню
				</button>
				<button className={styles.white_btn} onClick={handleLogout}>
					Вихід
				</button>
			</nav>

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

export default AllTask;
