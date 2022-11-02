import { RegisterDataType } from "../state/slice/userSlice";


export default async function registerUserApi(registerData: RegisterDataType) {
  const response = await fetch("http://localhost:3005/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData)
  });
  const data = await response.json()
  return data
}
