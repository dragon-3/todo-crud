import React from "react";
import {Form, useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react'
import "./Edit.css"

function Edit() {

    const [data, setData] = useState([]);
    const {id} = useParams();
    const url = `http://localhost:3001/todos/${id}`;
    const [values, setValues] = useState({
        todo: '',
        priority: ''
    })
    const Navigate = useNavigate();

    useEffect(() => {
        getAllData();
    }, [])

    const getAllData = () => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => (
            setData(data),
            setValues({
                todo: data.todo,
                priority: data.priority
            })
        )
        )
    }

    const updateItem = () => {
        fetch(url, {
            method: 'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                todo: values.todo,
                priority: values.priority
            })
        } )
        .then(() => {
            Navigate("/")
        })
    }

    const handleChange = (event) => {
        event.preventDefault();
        setValues({
            ...values, [event.target.name]: event.target.value
        })
    }


    return (
        <div>
            <h1>Edit</h1>
            <div className="form">
                <form action="">
                    <input type="text" name="todo" value={values.todo} onChange={handleChange} /><br />
                    <input type="text" name="priority" value={values.priority} onChange={handleChange} />
                </form>

                <button onClick={updateItem}>Update</button>

            </div>
        </div>
    )
}

export default Edit