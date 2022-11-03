import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toggleTodoApi from "../../api/toggleTodoapi";
import { RootState } from "../store";

export interface ITodoState {
  text: string;
  done: boolean;
  ownerId: number;
  id: number
}

type ToggleTodoType = {
  todoId: number,
  newDoneValue: boolean
}

export const toggleTodo = createAsyncThunk(
  'user/RegisterUser',
  async (doggleTodo: ToggleTodoType, thinkApi) => {
    const allState = thinkApi.getState() as  RootState
    const data = await toggleTodoApi(allState.user.token, doggleTodo.todoId, doggleTodo.newDoneValue)
    
    if(data.ok){
      return {token: data.token, ...doggleTodo}
    }
    return thinkApi.rejectWithValue([])
  }
)

const initialState: ITodoState[] = [{id: 1, text: "Текст", done: false, ownerId: 1}, {id: 2,text: "Текст2", done: true, ownerId: 1}];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default todoSlice.reducer;
