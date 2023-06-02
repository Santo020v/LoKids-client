import { Link, useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import { useState } from "react";
import axios from "axios";


const SignUp = () => {
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const hadleChange = ({ currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url ="https://lokids-server.onrender.com/api/users";
            const {data: res} = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <=500){
                setError(error.response.data.message);
            }
        }
    }
    return (
        <div className={styles.singup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left_reg}>
                    <h1>Є акаунт?</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Ввійти
                        </button>
                    </Link>
                </div>
                <div className={styles.right_reg}>
                     <Link to="/">
							<img src={require('./asset/close1437-removebg-preview.png')} className={styles.img_btn_reg} alt="close" />
					</Link>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Вітаю !</h1>
                        <h6>Будь ласка, введіть необхідну інформацію</h6>
                        <input type="text" placeholder="First Name" name="firstName"
                        onChange={hadleChange} value={data.firstName} 
                        required className={styles.input}></input>
                        <input type="text" placeholder="Last Name" name="lastName"
                        onChange={hadleChange} value={data.lastName} 
                        required className={styles.input}></input>
                        <input type="email" placeholder="Email" name="email"
                        onChange={hadleChange} value={data.email} 
                        required className={styles.input}></input>
                        <input type="password" placeholder="Password" name="password"
                        onChange={hadleChange} value={data.password} 
                        required className={styles.input}></input>
                        {error && <div className={styles.error_msg}> {error} </div>}
                        <button type="submit" className={styles.green_btn}>Зареєструватися</button>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default SignUp;
