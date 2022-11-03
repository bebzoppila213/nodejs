import { Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import Todo from "./pages/Todo";
import Header from "./compoentns/Header";
import { useEffect, useState } from "react";
import { useAppSelector } from "./hooks/redux";
import Modal from "./compoentns/Modal";

function App() {
  const state = useAppSelector((state) => state.user);
  const [modalIsOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className="App">
      <Header openModal={openModal} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="todo" element={<Todo />} />
      </Routes>
      <Modal closeModal={closeModal} isOpen={modalIsOpen} />
    </div>
  );
}

export default App;
