import { Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import Todo from "./pages/Todo";
import Header from "./compoentns/Header";
import { useEffect } from "react";
import { useAppSelector } from "./hooks/redux";
import Modal from "./compoentns/Modal";
import FormRegister from "./compoentns/FormRegister";
function App() {
  const state = useAppSelector(state => state.user)
  console.log(state);
  

  return (
    <div className="App">
      <FormRegister />
      <Header /> 
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="todo" element={<Todo />} />
      </Routes>
      {/* <Modal /> */}
    </div>
  );
}

export default App;
