import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const MainTeacher = () => {
	console.log(localStorage.getItem("teacherId"));
	const navigate = useNavigate();


	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("teacherId");
		window.location.reload();
	};
	const handleGoToStudentList = () => {
		navigate('/my-students');
	};

	const handleGoToTaskList = () => {
		navigate('/all-task-teacher');
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<img src={require('./asset/image-removebg-preview (4) copy 2.png')} className={styles.logo} alt="logo"/>
				<button className={styles.white_btn} onClick={handleGoToStudentList}>
					Мої студенти
				</button>
				<button className={styles.white_btn} onClick={handleGoToTaskList}>
					Всі завдання
				</button>
				<button className={styles.white_btn} onClick={handleLogout}>
					Вихід
				</button>
			</nav>

			<div className={styles.body_container}>
				<h6>Натисни на кнопку "Мої студенти", щоб побачити список студентів, додавати студентів та задавати їм домашнє завдання.<br /><br />
				Натисни на кнопку "Всі завдання", щоб побачити усі доступні завдання та виконати їх.</h6>
			</div>
		</div>
	);
};

export default MainTeacher;