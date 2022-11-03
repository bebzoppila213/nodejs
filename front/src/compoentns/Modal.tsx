import { MouseEvent } from "react";
import CustomForm from "../compoentns/CustomForm";
import { useAppDispatch } from "../hooks/redux";
import { authUser } from "../state/slice/userSlice"
type ModalProps = {
  isOpen: boolean,
  closeModal: () => void
}

type FormAuth = {
  email: string,
  password: string
}

type FormInputDataType = {
  label: string, 
  key: keyof FormAuth, 
  type: "text" | "email" | "password";
}

export default function Modal({isOpen, closeModal}:ModalProps) {
  const dispatcher = useAppDispatch()

  const defaultFormState: FormAuth = {email: '', password: ''}

  const formInputData: FormInputDataType[] = [{ label: "Почта", key: "email", type: "email" },
  { label: "Пароль", key: "password", type: "password" }]

  const clickBackground = (event: MouseEvent) => {
    closeModal()
  }

  const submitForm = (formSubmitData: FormAuth) => {
    dispatcher(authUser(formSubmitData));
    
  }
  
  return (
    <div onClick={event => clickBackground(event)} className={"main-modal" + ( isOpen ? " " :  " main-modal__close")}>
      <div onClick={event => event.stopPropagation()}  className="main-modal__inner">
        <h5>Форма авторизации</h5>
        <CustomForm inputData={formInputData} formSubmit={submitForm} delaultFormState={defaultFormState} ></CustomForm>
      </div>
    </div>
  );
}
