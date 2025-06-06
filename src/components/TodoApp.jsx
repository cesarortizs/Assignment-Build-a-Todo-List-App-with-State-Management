import { useState } from "react"
import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import { useEffect } from "react";

export function TodoApp()
{
    const [firstLoad, setFirstLoad] = useState(true);
    const [todos, setTodos] = useState([]);
    const [taskCounter, setTaskCounter] = useState(1);

    useEffect(()=>
    {
        if (!firstLoad)
        {
            localStorage.clear();
        }

        todos.forEach((todo)=> {
            localStorage.setItem(todo.task, todo.completed);
        });
    }, [todos])

    useEffect(()=>
    {
        const localStorageData = { ...localStorage };

        const todosList = Object.entries(localStorageData)

        let taskNumber = 1;

        for (const [key, value] of todosList) {
            const newTask = {
            id: taskNumber,
            task: key,
            completed: (value === 'true')
            }
            setTodos((currentState)=>[...currentState, newTask]);
            taskNumber += 1;
        }

        if (todosList.length == 0)
        {
            setTaskCounter(1);
        }

        else
        {
            setTaskCounter(todosList.length + 1);
        }

        return() => {
            setTodos((currentState)=> {
                return currentState.filter((todo)=>
                {
                    for (const [key, value] of todosList) {
                        todo.id != key;
                    }
                })
            });

            setFirstLoad(false);
        }
    }, [])

    return (
        <div className="p-3">
            {todos.map((todo)=>
		    {
		        return (
                    <TodoItem key={todo.id} todo={todo} setTodos={setTodos}/>
                )
		    })}
            <TodoInput setTodos={setTodos} taskCounter={taskCounter} setTaskCounter={setTaskCounter}/>
        </div>       
    )
}