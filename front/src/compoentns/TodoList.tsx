import TodoListItem from "./TodoListItem";
import { ITodoState } from "../state/slice/todoSlice";

type TodoListProps = {
  todos: ITodoState[];
  toggleTodo: (idTodo: number, todoValue: boolean) => void
};

export default function TodoList({ todos, toggleTodo }: TodoListProps) {

  

  return (
    <div className="tab-content" id="ex1-content">
      <div
        className="tab-pane fade show active"
        id="ex1-tabs-1"
        role="tabpanel"
        aria-labelledby="ex1-tab-1"
      >
        <ul className="list-group mb-0">
          {todos.map((todoItem) => (
            <TodoListItem toggleTodo={() => toggleTodo(todoItem.id, !todoItem.done)} todo={todoItem}></TodoListItem>
          ))}
        </ul>
      </div>
    </div>
  );
}
