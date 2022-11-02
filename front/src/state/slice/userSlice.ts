import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import registerUserApi from "../../api/registerUser";

export interface UserState {
  name: string;
  email: string;
  token: string;
}

export type RegisterDataType = {
  email: string,
  name: string,
  password: string,
}

export const registerUser = createAsyncThunk(
  'user/RegisterUser',
  async (registerData: RegisterDataType, {rejectWithValue}) => {
    const data = await registerUserApi(registerData)
    if(data.ok){
      return {token: data.token, ...registerData}
    }
    return rejectWithValue({})
  }
)


const initialState: UserState = {
  name: "",
  email: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload.token
      state.email =  action.payload.email
      state.name =  action.payload.name
      
    })
  },
});

//   export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default userSlice.reducer;
