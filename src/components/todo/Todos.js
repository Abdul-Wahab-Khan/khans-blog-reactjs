import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CreateTodo from "./Create";


function Todos() {
    const count = useSelector(s => s.counter.value)
    const number = 3
    const allTodos = [
        {number: 1, title: 'Web development'},
        {number: 2, title: 'Python'}
    ]
    
    const [todos, setTodos] = useState(allTodos)

    const td = todos.map(element => 
        <Todo todo={element} onEditTitle={editTodo} onDeleteTodo={onDeleteTodo} />
    );

    
    function addTodo(title) {
        allTodos.push({
            number,
            title
        })

        setTodos(allTodos)
    }

    function editTodo(number, title) {
        allTodos.forEach(el => {
            if (el.number === number) {
                el.title = title 
            }
        })

        setTodos(allTodos)
    }

    function onDeleteTodo(number) {
        console.log(number)
    }

    return (
        <div>
            {td}
            <CreateTodo onTodoSubmitted={addTodo} />
            <h4>Redux count {count}</h4>
        </div>
    )
}

function Todo({todo, onEditTitle, onDeleteTodo}) {
    const [type, setType] = useState('show')
    const [title, setTitle] = useState(todo.title)

    function handleChangeType(t, event) {
        if (t == 'show') {
            onEditTitle(todo.number, title)
        } 
        setType(t)
    }

    function changeTitle(e) {
        setTitle(e.target.value)
    }

    return (
        <div key={todo.number}>
            {type === 'show' && 
            <div>
                <h3>{title}</h3>
                <button onClick={handleChangeType.bind(this, 'edit')}>Edit</button>
            </div>}
            
            {type === 'edit' && 
            <div>
                <input type="text" onChange={changeTitle} defaultValue={title} /> 
                <button onClick={handleChangeType.bind(this, 'show')}>Save</button>   
            </div>}
            <button onClick={onDeleteTodo.bind(this, todo.number)}>Delete</button>
        </div>
    )
}

export default Todos