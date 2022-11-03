import { ITodoState } from "../state/slice/todoSlice";

type TodoListItemProps = {
    todo: ITodoState;
    toggleTodo: () => void
  };

export default function TodoListItem({todo, toggleTodo}:TodoListItemProps){


    return(
        <li onClick={() => toggleTodo()} className="list-group-item d-flex align-items-center border-0 mb-2 rounded" style={{ backgroundColor: "#f4f6f7" }}>
            <input className="form-check-input me-2" type="checkbox" value=""aria-label="..." checked={!todo.done} />
            {
                todo.done ? todo.text : <s> {todo.text} </s>
            }
          </li>
    )
}