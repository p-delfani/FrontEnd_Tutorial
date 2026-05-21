import "./Breadcrumb.css";

function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb" className="w-max">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <a href="#">خانه</a>
          <span className="seperator"> / </span>
        </li>
        <li className="breadcrumb-item">
          <a href="#">دوره ها</a>
          <span className="seperator"> / </span>
        </li>
        <li className="breadcrumb-item">
          <a href="#">فرانت اند</a>
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
