import styles from "./styles.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";


const HomePage = () => {
	return (
		<div className={styles.homepage_container}>
            <div className={styles.header_container}>
                <img src={require('./asset/image-removebg-preview (4).png')} className={styles.logo} alt="logo"/>
                <Link to="/login">
                        <button type="button" className={styles.login_btn}>
                            Ввійти
                        </button>
                </Link>
            </div>
            <div className={styles.info_for_students}>
                <h2><a>Інформація для учнів та їх батьків</a></h2>
                <Carousel>
                    <Carousel.Item>
                        <div className={styles.carousel1_container}>
                            <div className={styles.right_carousel} >
                                <img src={require('./asset/bigstock-Child-Training-Basic-Language-408859919-scaled-removebg-preview.png')} alt="img"/>
                            </div>
                            <div className={styles.left_carousel}>
                                <h3><a>Вітаю! Ну що, готові почати?</a></h3>
                                <p><a>Ви знаходитесь на освітній платформі LoKids, за допомогою якої ви зможете працювати з логопедами та психологами дистанційно.</a></p>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className={styles.carousel1_container}>
                            <div className={styles.right_carousel} >
                                <img src={require('./asset/istockphoto-1253333361-612x612-removebg-preview.png')} alt="img"/>
                            </div>
                            <div className={styles.left_carousel}>
                                <h3><a>Все дуже просто!</a></h3>
                                <p><a>Все що Вам потрібно зробити, аби користуватися платформою - зареєструватися.</a></p>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className={styles.carousel1_container}>
                            <div className={styles.right_carousel} >
                                <img src={require('./asset/istockphoto-1132414801-612x612-removebg-preview.png')} alt="img"/>
                            </div>
                            <div className={styles.left_carousel}>
                                <h3><a>Зареєструвалися? Тоді вперед!</a></h3>
                                <p><a>Після реєстрації Ви будете мати доступ до усіх завдань, будете отримувати домашнє завдання від вашого спеціаліста та виконувати його.</a></p>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>


            <div className={styles.info_for_taechers}>
            <h2><a>Інформація для викладачів (логопедів та психологів)</a></h2>
                <Carousel>
                    <Carousel.Item>
                    <div className={styles.carousel1_container}>
                            <div className={styles.right_carousel} >
                                <img src={require('./asset/image-removebg-preview (8).png')} alt="img"/>
                            </div>
                            <div className={styles.left_carousel}>
                                <h3><a>Вітаю! </a></h3>
                                <p><a>Ви знаходитесь на освітній платформі LoKids, за допомогою якої ви зможете працювати з дітками дистанційно.</a></p>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className={styles.carousel1_container}>
                            <div className={styles.right_carousel} >
                                <img src={require('./asset/image-removebg-preview (9).png')} alt="img"/>
                            </div>
                            <div className={styles.left_carousel}>
                                <h3><a>Треба трошки зачекати...</a></h3>
                                <p><a>Для того, щоб почати працювати на даній платформі, Вам необхідно зв'язатися з адміністратором та надати йому дані для реєстрації. Пошта вказана нижче.</a></p>
                                <div className={styles.email}> veronika20020403@gmail.com </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className={styles.carousel1_container}>
                            <div className={styles.right_carousel} >
                                <img src={require('./asset/bigstock-Child-Training-Basic-Language-408859919-scaled-removebg-preview.png')} alt="img"/>
                            </div>
                            <div className={styles.left_carousel}>
                                <h3><a>Якщо все зроблено...</a></h3>
                                <p><a>тоді Ви можете легко користуватися нашою платформою. <br /> Після входження в акаунт Ви будете мати змогу: перегядати на виконувати всі завдання, додавати учнів до свого списку, задавати учням домашнє завдання та перевіряти їх виконання.</a></p>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
	);
};

export default HomePage;