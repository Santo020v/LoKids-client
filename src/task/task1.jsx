import React from 'react';
import styles from "./styles.module.css";
import Draggable from 'react-draggable';
import { useState} from 'react';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Task1 = () => {
  const idHomework = localStorage.getItem("homeworkId");
  const idTask = localStorage.getItem("idTask");
  const idStudent = localStorage.getItem("studentId");
  const boxRef = useRef(null);
  const boxRef1 = useRef(null);
  const [pos, setPos] = useState({x: 0, y:0});
  const [pos1, setPos1] = useState({x: 0, y:0});

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

  const handleCheck = () => {
    if((pos.x >= 203 && pos.x <=520) && (pos.y>=401 && pos.y<=540)){
      if((pos1.x >= 1340 && pos1.x <=1660) && (pos1.y>=401 && pos1.y<=540)){
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

  console.log(pos);
  console.log(pos1);


  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Перенеси кульки у коробочки з таким ж кольором!</h2>
      <div className={styles.right}></div>
      <div className={styles.left}></div>
      <Draggable defaultPosition={{x: 800, y: 100}}>
          <div className="handle"  > 
              <div id="redCircle" className={styles.circle} ref={boxRef} onClick={ran} ></div>
        </div>
      </Draggable>

      <Draggable defaultPosition={{x: 900, y: 40}}>
          <div className="handle"> 
              <div id="blueCircle" className={styles.circle_blue} ref={boxRef1} onClick={ran1}></div>
          </div>
      </Draggable>

        <img src={require('./asset/7799536.png')} className={styles.buttonCheck} onClick={handleCheck} alt="task img"/>

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

export default Task1;
