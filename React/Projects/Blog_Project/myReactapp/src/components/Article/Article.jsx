// Fallback

function Article({ title, author, price, img }) {
  // props.title = "Title Test"; ❌

  return (
    <article className="article-card">
      <header>
        <img src={img} alt="Article Img" />
      </header>
      <main className="article-body">
        <h4 className="article-title">{title}</h4>
        <p className="article-caption">
          در این مقاله، به‌صورت گام‌به‌گام یاد می‌گیرید چطور یک پروژه ساده اما
          حرفه‌ای با پایتون بسازید که رزومه برنامه‌نویسی‌تون رو تقویت کنه. از
          ایده‌پردازی تا کدنویسی و نکات کلیدی برای ارائه پروژه، همه‌چیز رو با
          زبانی ساده و مثال‌های عملی پوشش دادیم!
        </p>
      </main>
      <div className="divider"></div>
      <footer className="article-footer flex justify-between">
        <div>
          <div className="author-label flex items-center gap-1">
            <i className="fa-solid fa-user"></i>
            <span> نویسنده: </span>
            <span className="author-name">{author || "تیم سبزبلاگ"}</span>
          </div>
        </div>
        <div>
          <div className="published-date flex items-center gap-2">
            <i className="fa-solid fa-calendar"></i>
            <span>
              {" "}
              {price ? `${price.toLocaleString()} تومان` : "رایگان"}{" "}
            </span>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default Article;
