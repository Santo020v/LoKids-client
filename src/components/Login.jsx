import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: ""});
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            const url = "http://localhost:3000/api/auth";
             await axios.post(url, data)
			.then((response) => {
				if(response.data.usertype === "student"){
					localStorage.setItem("studentId", response.data.userId);
					localStorage.setItem("token", response.data.token);
					window.location = "/home";
				}else if(response.data.usertype === "teacher"){
					localStorage.setItem("teacherId", response.data.teacherId);
					localStorage.setItem("token", response.data.token);
					window.location = "/home-teacher";
				}
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
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>З поверненням!</h1>
						<h6>Будь ласка, введіть необхідну інформацію</h6>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Ввійти
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<Link to="/">
							<img src={require('./asset/close1437-removebg-preview.png')} className={styles.img_btn} alt="close"/>
					</Link>
					<h1>Немає акаунту?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Зареєструватися
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;