import React from 'react';
import styles from "./styles.module.css";
import Draggable from 'react-draggable';
import { useState} from 'react';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Task2 = () => {
  const idHomework = localStorage.getItem("homeworkId");
  const idTask = localStorage.getItem("idTask");
  const idStudent = localStorage.getItem("studentId");
  const boxRef = useRef(null);
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const boxRef3 = useRef(null);
  const boxRef4 = useRef(null);
  const boxRef5 = useRef(null);
  const [pos, setPos] = useState({x: 0, y:0});
  const [pos1, setPos1] = useState({x: 0, y:0});
  const [pos2, setPos2] = useState({x: 0, y:0});
  const [pos3, setPos3] = useState({x: 0, y:0});
  const [pos4, setPos4] = useState({x: 0, y:0});
  const [pos5, setPos5] = useState({x: 0, y:0});

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);


  const postData = async() => {
    const url = "http://localhost:3000/api/setDoneDataToTask";
    await axios.post(url, {idHomework, idTask, idStudent})
    .then((response) => {
            console.log(response); })
  };

  const ran = async() => {
    const {x, y} = await boxRef.current?.getBoundingClientRect();;
    setPos({x, y});
  }

  const ran1 = async() => {
    const {x, y} = await boxRef1.current?.getBoundingClientRect();
    setPos1({x, y});
  }

  const ran2 = async() => {
    const {x, y} = await boxRef2.current?.getBoundingClientRect();;
    setPos2({x, y});
  }

  const ran3 = async() => {
    const {x, y} = await boxRef3.current?.getBoundingClientRect();
    setPos3({x, y});
  }

  const ran4 = async() => {
    const {x, y} = await boxRef4.current?.getBoundingClientRect();;
    setPos4({x, y});
  }

  const ran5 = async() => {
    const {x, y} = await boxRef5.current?.getBoundingClientRect();;
    setPos5({x, y});
  }


  const handleCheck = () => {
    if((pos.x >= 0 && pos.x <=890) && (pos.y>=0 && pos.y<=890) && (pos2.x >= 0 && pos2.x <=890) && (pos2.y>=0 && pos2.y<=890) && (pos4.x >= 0 && pos4.x <=890) && (pos4.y>=0 && pos4.y<=890)){
      if((pos1.x >= 952 && pos1.x <=1840) && (pos1.y>=0 && pos1.y<=890) && (pos3.x >= 952 && pos3.x <=1840) && (pos3.y>=0 && pos3.y<=890) && (pos5.x >= 952 && pos5.x <=1840) && (pos5.y>=0 && pos5.y<=890)){
        setShow(true);
        postData();
      }
      else{
        setShow1(true);
      }
    }
    else{
      setShow1(true);
    }
  };

  console.log("pos1", pos);
  console.log("pos2", pos1);
  console.log("pos3", pos2);
  console.log("pos4", pos3);
  console.log("pos5", pos4);
  console.log("pos6", pos5);


  return (
    <div className={styles.container}>
         <div className={styles.text}><h1>Розподіли емоції на позитивні на негативні</h1></div>
      <div className={styles.right1}>
        <h3>Позитивні емоції</h3>
      </div>
      <div className={styles.left1}>
      <h3>Негативні емоції</h3>
      </div>
     
      <Draggable defaultPosition={{x: 800, y: 100}}>
          <div className="handle"  > 

              <img src={require('./asset/smiling.png')} id="redCircle" className={styles.image} ref={boxRef} onClick={ran}  alt="task img"/>
        </div>
      </Draggable>

      <Draggable defaultPosition={{x: 900, y: 40}}>
          <div className="handle"> 

              <img src={require('./asset/angry.png')} id="blueCircle" className={styles.image} ref={boxRef1} onClick={ran1}  alt="task img" />

          </div>
      </Draggable>
      
      <Draggable defaultPosition={{x: 800, y: 200}}>
          <div className="handle"  > 

              <img src={require('./asset/smile (1).png')} id="redCircle1" className={styles.image} ref={boxRef2} onClick={ran2} alt="task img"  />

        </div>
      </Draggable>

      <Draggable defaultPosition={{x: 800, y: 300}}>
          <div className="handle"> 
          
              <img src={require('./asset/sad.png')} id="blueCircle2" className={styles.image} ref={boxRef3} onClick={ran3} alt="task img"/>
          </div>
      </Draggable>

      <Draggable defaultPosition={{x: 900, y: 100}}>
          <div className="handle"  > 
              <img src={require('./asset/smile.png')} id="redCircle3" className={styles.image} ref={boxRef4} onClick={ran4} alt="task img" />

        </div>
      </Draggable>

      <Draggable defaultPosition={{x: 900, y: 150}}>
          <div className="handle"> 
              <img src={require('./asset/confused.png')} id="blueCircle4" className={styles.image} ref={boxRef5} onClick={ran5} alt="task img" />
          </div>
      </Draggable>
       <img src={require('./asset/7799536.png')} className={styles.buttonCheck} onClick={handleCheck} alt="task img" />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ти молодець! </Modal.Title>
        </Modal.Header>
        <Modal.Body>Правильно виконане завдання! Ти заробив +1 бал!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Упссс! </Modal.Title>
        </Modal.Header>
        <Modal.Body>Треба краще постаратись! </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Task2;
