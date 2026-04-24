import "./Header.css";

function Header({ hasPlan }) {
  return (
    <header className="client-header container">
      <div className="flex items-center gap-4">
        <a className="nav-link" href="#">
          خانه
        </a>
        <a className="nav-link" href="#">
          کامپوننت‌ها
        </a>
        <a className="nav-link" href="#">
          مقالات
        </a>
        <a className="nav-link" href="#">
          درباره ما
        </a>
      </div>

      <div className="header-btns flex items-center gap-2">
        {!hasPlan && <button className="btn primary-btn">خرید اشتراک</button>}
        <button className="btn secondary-btn">ورود یا ثبت‌نام</button>
      </div>
    </header>
  );
}

export default Header;
