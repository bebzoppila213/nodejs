import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="btn btn-primary nav-item__link" to="/">На главную</Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-primary nav-item__link" to="todo">Список дел</Link>
        </li>
      </ul>
    </nav>
  );
}
