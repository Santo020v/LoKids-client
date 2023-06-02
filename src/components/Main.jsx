import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("studentId");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
			<img src={require('./asset/image-removebg-preview (4) copy 2.png')} className={styles.logo} alt="logo"/>
				<Link to="/all-task">
						<button type="button" className={styles.white_btn}>
							Усі завдання
						</button>
				</Link>

				<Link to="/my-homework">
						<button type="button" className={styles.white_btn}>
							Моє домашнє завдання
						</button>
				</Link>


				<button onClick={handleLogout} className={styles.white_btn}>Logout</button>
			</nav>
			<div className={styles.body_container}>
				<h6>Натисни на кнопку "Моє домашнє завдання", щоб переглянути усі домашні завдання та виконати їх.<br /><br />
				Натисни на кнопку "Усі завдання", щоб переглянути усі завдання та виконати їх.</h6>
			</div>
		</div>
	);
};

export default Main;