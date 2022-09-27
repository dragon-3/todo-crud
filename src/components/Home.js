import React from "react";
import "./Home.css";
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

function Home() {

    const [data, setData] = useState([]);
    const url = `http://localhost:3001/todos/`;
    const [values, setValues] = useState({
        todo: '',
        priority: ''
    })

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
        fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                todo: values.task,
                priority: values.priority
            })
        })
    }

    const deleteItem = (id) => {
        fetch(url + `${id}`, {
            method: "DELETE"
        })
    }

    return (
        <div>
            <h1>Crud project</h1>

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
                                    <label htmlFor="">Tasks</label><br />
                                    <input type="text" name="task" onChange={handleChange}/>
                                </div>
                                <div className="priority">
                                    <label htmlFor="">Priority</label><br />
                                        <input type="text" name="priority" onChange={handleChange}/>
                                </div>
                                <div className="button">
                                    <button onClick={addItem}>Add Task</button>
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
                                                        <Link to={`${items.id}`}><button>EDIT</button></Link>
                                                        <button onClick={() => deleteItem(items.id)}>DELETE</button>
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