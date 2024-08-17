import React, {useReducer, useState} from 'react';

const initialState = [];

function todoReducer(state,action){
    switch(action.type){
        case 'ADD_TODO':
            return [...state, {id : Date.now(), text : action.payload, completed : false}];
        case 'TOGGLE_TODO':
            return state.map((todo)=>(
                todo.id === action.payload ? {...todo, completed : !todo.completed} : todo
            ));
        case 'ROMOVE_TODO':
            return state.filter(todo=>todo.id !== action.payload); 
        default:
            return state;           
    }
}

function TodoApp() {
    const [todos, dispatch] = useReducer(todoReducer, initialState);
    const [inputValue, setInputValue] = useState('');

    const handleAddTask = () =>{
        if(inputValue.trim()){
            dispatch({type:'ADD_TODO', payload : inputValue});
            setInputValue('');
        }
    }
  return (
    <div>
    <h2>TodoApp</h2>
    <input
    type='text'
    value={inputValue}
    onChange={(e)=>setInputValue(e.target.value)}
    placeholder='Add a New Task'
    />
    <button onClick={handleAddTask}>Add Task</button>

    <ul>
        {todos.map((todo)=>(
            <li key={todo.id}>
                <input
                type='checkBox'
                checked={todo.completed}
                onChange={()=>dispatch({type: 'TOGGLE_TODO', payload : todo.id})}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={()=>dispatch({type: 'ROMOVE_TODO', payload : todo.id})}>
                    Delete
                </button>
            </li>
        ))}
    </ul>
    </div>
  )
}

export default TodoApp