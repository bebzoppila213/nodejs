import TodoMenu from "../compoentns/TodoMenu";
import TodoNav from "../compoentns/TodoNav";
import TodoList from "../compoentns/TodoList";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleTodo as toggleTodoState } from "../state/slice/todoSlice";

export default function Todo() {
    const allTodos = useAppSelector(state => state.todo)
    const dispatcher = useAppDispatch()

    const toggleTodo = (todoId: number, todoValue: boolean) => {
        // console.log(todoValue);
        
        dispatcher(toggleTodoState({todoId, newDoneValue: todoValue}))
    }
    

  return (

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                <TodoMenu></TodoMenu>
                <TodoNav></TodoNav>
                <TodoList toggleTodo={toggleTodo} todos={allTodos}></TodoList>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
