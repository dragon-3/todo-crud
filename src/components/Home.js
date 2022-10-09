import React from "react";
import "./Home.css";
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
// import "bootstrap/dist/css/bootstrap.min.css"

function Home() {

    const [data, setData] = useState([]);
    const url = `https://todo-crud-backend.herokuapp.com/todos/`;
    const [values, setValues] = useState({
        todo: '',
        priority: ''
    })
    const [errorMessage, setErrorMessage] = useState(false)
    const [errorNumber, setErrorNumber] = useState(false)

    useEffect(() => {
        getAllData();
    }, [data])

    const getAllData = () => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data))
    }

    const handleChange = (event) => {
        event.preventDefault();
        setValues({
            ...values, [event.target.name]: event.target.value,
        })
    }

    const addItem = () => {

        if (isNaN(values.priority)) {
            setErrorNumber(true)
        }
        else if (values.task && values.priority != '') {
            fetch(url, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    todo: values.task,
                    priority: values.priority
                })
            })
            .then(setValues({
                task: "", priority: ""
            }))
            .then(
                setErrorMessage(false),
                setErrorNumber(false)
            );
        }
        
        else {
            setErrorMessage(true)
        }
        
    }

    const deleteItem = (id) => {
        fetch(url + `${id}`, {
            method: "DELETE"
        })
    }

    return (
        <div>
            <h1>Crud project</h1>

            {errorMessage ? <h3>Enter a todo & priority</h3> : null}
            {errorNumber ? <h3>Enter a number</h3> : null}

            <div className="main">
                <div className="content">
                    <div className="add-section">
                        <div className="center">
                            {/* <div className="inputs">
                                <div className="names">
                                    <label htmlFor="">Tasks</label>
                                    <label htmlFor="">Description</label>
                                </div>
                            </div> */}
                            <div className="inputs">
                                <div className="tasks">
                                    <input type="text" placeholder="Todo" name="task" onChange={handleChange} value={values.task} />
                                </div>
                                <div className="priority">
                                    <input type="text" placeholder="Priority" name="priority" onChange={handleChange} value={values.priority} />
                                </div>
                                <div className="button">
                                    <button onClick={addItem} >ADD</button>
                                </div>
                            </div>
                            {/* <div className="inputs">
                                <div className="tasks-top">
                                    <label htmlFor="">Task</label><br />
                                    <label htmlFor="">Description</label><br />
                                </div>
                                <div className="tasks-bottom">
                                    <input type="text" />
                                    <input type="text" />
                                </div>
                                
                            </div> */}
                        </div>
                        
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <th>Todos</th>
                                <th>priority level</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                    {
                                        data.map(
                                            items => (
                                                <tr key={items.id}>
                                                    <td>{items.todo}</td>
                                                    <td>{items.priority}</td>
                                                    <td>
                                                        <Link to={`${items.id}`}><button id="edit">EDIT</button></Link>
                                                        <button id="delete" onClick={() => deleteItem(items.id)}>DELETE</button>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                    
                            </tbody>
                        </table>
                    </div>

                </div>
                
               
            </div>
        </div>
    )
}

export default Home