import { useAppSelector } from "../hooks/redux";
import Nav from "./Nav";

type HeaderProps = {
  openModal: () => void
}

export default function Header({openModal} : HeaderProps) {
  const user = useAppSelector((state) => state.user);

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header-info">
            <h4 className="header__title">Добро пожаловать {user.name}</h4>
            {
              user.name ? "" : <button onClick={() => openModal()} className="btn btn-secondary">Авторизоватся</button>
            }
          </div>
          <div className="header-menu">
            <Nav></Nav>
          </div>
        </div>
      </div>
    </header>
  );
}
