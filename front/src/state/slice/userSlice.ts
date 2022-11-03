import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import registerUserApi from "../../api/registerUser";
import authFormEmail from "../../api/authFormEmail";
export interface IUserState {
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

type AuthUserProps = {
  email: string,
  password: string
}


export const authUser = createAsyncThunk(
  'user/authUser',
  async (authData: AuthUserProps, {rejectWithValue}) => {
    const data = await authFormEmail(authData)
    if(data.ok){
      return {...data, ...authData}
    }
    return rejectWithValue({})
  }
)


const initialState: IUserState = {
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

    builder.addCase(authUser.fulfilled, (state, action) => {
      state.token = action.payload.user.token
      state.email = action.payload.user.email
      state.name = action.payload.user.name
    })

  },
});

//   export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default userSlice.reducer;
