import { FormEvent, useEffect, useState } from "react";
import CuspomInput from "./CustomInput";
import useForm from "../hooks/useForm";
import {registerUser} from "../state/slice/userSlice"
import { useAppDispatch } from "../hooks/redux";
type FormDataType = {
  email: string;
  name: string;
  password: string;
};

type InputDataType<T> = {
  label: string;
  key: keyof T;
  type: "text" | "email" | "password";
};

export default function FormRegister() {
    const dispatcher = useAppDispatch()

  const { formData, updateFormValue } = useForm<FormDataType>({
    email: "",
    name: "",
    password: "",
  });

  const inputData: InputDataType<FormDataType>[] = [
    { label: "Почта", key: "email", type: "email" },
    { label: "Имя", key: "name", type: "text" },
    { label: "Пароль", key: "password", type: "password" },
  ];

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatcher(registerUser(formData))
  };

  return (
    <form onSubmit={(event) => formSubmit(event)} className="form">
      {inputData.map((inputItem) => (
        <CuspomInput
          type={inputItem.type}
          updateVlue={(text: string) => updateFormValue(inputItem.key, text)}
          label={inputItem.label}
        />
      ))}
      <button type="submit" className="btn btn-primary">
        Отправить
      </button>
    </form>
  );
}
