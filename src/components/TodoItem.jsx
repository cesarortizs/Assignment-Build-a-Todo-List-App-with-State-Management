import { useState } from "react";
import styles from "./TodoItem.module.css";

export function TodoItem(props)
{
    const [isEditing, setIsEditing] = useState(false);

    return(
        <div className={styles.todoItem}>
            <div className={styles.tasksActionsContainer}>
                <div className={styles.taskTitleContainer}>
                    <input className={styles.tasksActionsContainerCheckbox} type="checkbox" checked={ props.todo.completed ? true : false} onChange={()=>
                        {
                            props.setTodos((currentState)=> {
                                return currentState.map((todo)=>
                                {
                                    if (todo.id === props.todo.id)
                                    {
                                        return({...todo, completed: !todo.completed});
                                    }
                                    
                                    else
                                    {
                                        return todo;
                                    }
                                })
                            });
                        }
                    }/>
                    {isEditing ? (
                        <input
                            aria-label="username"
                            name="username"
                            id="username"
                            value={props.todo.task}
                            onChange={(e) => {
                                props.setTodos((currentState)=> {
                                    return currentState.map((todo)=>
                                    {
                                        if (todo.id === props.todo.id)
                                        {
                                            return({...todo, task: e.target.value});
                                        }
                                        
                                        else
                                        {
                                            return todo;
                                        }
                                    })
                                });
                            }}
                        />
                    ) : (
                        <span className={props.todo.completed ? "text-decoration-line-through" : undefined}>{props.todo.task}</span>
                    )}
                </div>
                <div>
                    <button
                    className="btn btn-primary"
                    onClick={() => {
                        setIsEditing((currentState) => !currentState);
                    }}
                    >{isEditing ? 'Finish editing' : 'Edit task'}</button>
                    <button
                    className="btn btn-danger"
                    onClick={() => {
                        props.setTodos((currentState)=> {
                            return currentState.filter((todo)=>
                            {
                                return todo.id != props.todo.id;
                            })
                        });
                    }}
                    >Delete task</button>
                </div>
            </div>
            <span>Status: {props.todo.completed ? 'Completed' : 'Pending'}</span>
        </div>
    )
}