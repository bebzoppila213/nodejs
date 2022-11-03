import { FormEvent } from "react";
import useForm from "../hooks/useForm";
import CuspomInput from "./CustomInput";

type CustomFormProps<T> = {
    formSubmit: (formData: T) => void,
    delaultFormState: T,
    inputData: InputDataType<T>[]
}

type InputDataType<T> = {
    label: string;
    key: keyof T;
    type: "text" | "email" | "password";
  };

export default function CustomForm<T>({delaultFormState, formSubmit, inputData}: CustomFormProps<T>){

    const { formData, updateFormValue } = useForm<T>(delaultFormState);

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        formSubmit(formData)
    }

    return(
<form onSubmit={(event) => submitForm(event)} className="form">
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
    )
}