import { useState } from "react";

export function TodoInput(props)
{
    const [task, setTask] = useState('');

    return(
        <form className="d-flex" onSubmit={(e)=>
        {
            e.preventDefault();

            const newTask = {
            id: props.taskCounter,
            task: task,
            completed: false
            }
            props.setTodos((currentState)=>[...currentState, newTask]);
            props.setTaskCounter((currentState)=>currentState += 1);
        }
        }>
            <input className="form-control" type="text" placeholder="Enter your task" onChange={(e)=>
                {
                    setTask(e.target.value);
                }
            }/>
            <button className="btn btn-primary text-nowrap">Create task</button>
        </form>
    )
}