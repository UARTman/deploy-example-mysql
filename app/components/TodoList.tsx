import { Task } from "@prisma/client";

interface TodoListProps {
    todos: [Task], 
    onTaskChange: (id: number, newTask: Task) => void, 
    onTaskDelete: (id: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({todos, onTaskChange: changeTask, onTaskDelete: deleteTask}) => {
    function onTick(task: Task) {
        changeTask(task.id, {
            done: !task.done,
            id: task.id,
            title: task.title
        })
    }

    return (
        <div>
            <ul>
                {todos.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.done} onChange={() => onTick(task)} /> 
                            {task.title} - 
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}