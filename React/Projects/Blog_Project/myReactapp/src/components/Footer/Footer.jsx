import "./Footer.css";

function Footer() {
  return (
    <footer id="client-footer">
      <div id="footer-headline">
        <h5 id="footer-title">
          پروژه رزومه‌ای می‌خواهید؟ با سبزلرن حرفه‌ای بسازید!
        </h5>
        <p className="footer-caption">
          سبزلرن همراه شماست تا با آموزش‌های کاربردی و پروژه‌های جذاب
          برنامه‌نویسی، رزومه‌ای قدرتمند بسازید. از یادگیری تا اجرای پروژه‌های
          واقعی، ما کنارتون هستیم تا مهارت‌هاتون رو به سطح بعدی ببرید!
        </p>

        <div className="footer-cta flex items-center justify-center gap-4">
          <button className="btn primary-btn">
            <span className="icon">
              <i className="fa-solid fa-circle-play"></i>
            </span>
            شروع یادگیری
          </button>
          <button className="btn secondary-btn">مشاهده پروژه‌ها</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
