import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Article from "./components/Article/Article";

import "./App.css";
import Button from "./components/Button/Button";

function App() {
  const articles = [
    {
      title: "ساخت اولین پروژه رزومه‌ای با پایتون: قدم‌به‌قدم تا موفقیت",
      author: "سعیدی‌راد",
      img: "/images/clay-banks-cReV-cbE2L4-unsplash.jpg",
      price: 0,
    },
    {
      title: "ساخت اولین پروژه رزومه‌ای با React: قدم‌به‌قدم تا موفقیت",
      author: "",
      img: "/images/snowy.jpg",
      price: 0,
    },
    {
      title: "توسعه کامپوننت های اصولی برای React",
      author: "",
      img: "/images/clay-banks-cReV-cbE2L4-unsplash.jpg",
      price: 12_000,
    },
    {
      title: "5 نکته مهم و تجربی برای React",
      author: "عبادی",
      img: "/images/snowy.jpg",
      price: 25_000,
    },
    {
      title: "برنامه نویسی در عصر هوش مصنوعی",
      author: "خندقی",
      img: "/images/clay-banks-cReV-cbE2L4-unsplash.jpg",
      price: 32_000,
    },
    {
      title: "پرسونال برندینگ برای برنامه نویسان",
      author: "سعیدی‌راد",
      img: "/images/snowy.jpg",
      price: 0,
    },
    {
      title: "ساخت وبلاگ ساده با جاوا اسکریپت",
      author: "سعیدی‌راد",
      img: "/images/clay-banks-cReV-cbE2L4-unsplash.jpg",
      price: 0,
    },
    {
      title: "شبکه سازی حرفه‌ای برای برنامه نویسان",
      author: "",
      img: "/images/snowy.jpg",
      price: 18_000,
    },
  ];

  let hasPlan = false ;

  return (
    <div>
      <Header hasPlan={hasPlan} />

      <main>
        <section
          id="hero-section"
          className="container flex items-center justify-between"
        >
          <div id="headline">
            <h1 id="title">سبزبلاگ؛ مرجع آموزش و پروژه‌های برنامه‌نویسی</h1>
            <p id="caption">
              سبزبلاگ فضایی برای یادگیری برنامه‌نویسی و به‌اشتراک‌گذاری دانش
              است. اینجا مقالات آموزشی، نکات کاربردی و پروژه‌های رزومه‌ای
              برنامه‌نویسی با زبانی ساده و حرفه‌ای ارائه می‌شه. هدف ما کمک به
              شماست تا مهارت‌هاتون رو تقویت کنید و رزومه‌ای قوی با پروژه‌های
              جذاب بسازید!
            </p>
            <div id="hero-btns" className="gap-2">
              <button className="btn primary-btn">خواندن مقالات</button>
              {!hasPlan && (
                <button className="btn secondary-btn">تهیه اشتراک</button>
              )}
            </div>
          </div>
          <div id="image-container">
            <img src="./public/images/hero-illustrator.png" />
          </div>
        </section>
        <section id="articles-section">
          <div id="articles-header" className="container flex justify-between">
            <h2 id="section-title">مقالات اخیر</h2>
            <a href="#" className="read-more">
              {" "}
              بیشتر بخوانید{" "}
            </a>
          </div>

          <div id="items" className="container">
            <Article {...articles[0]} />
            <Article {...articles[1]} />
            <Article {...articles[2]} />
            <Article {...articles[3]} />
            <Article {...articles[4]} />
            <Article {...articles[5]} />
            <Article {...articles[6]} />
            <Article {...articles[7]} />
          </div>
        </section>
      </main>

      <Footer />
    </div>

    // <div>
    //   <Button primary label="Login" />
    //   <Button label="Cancel" />
    //   <Button primary />
    // </div>
  );
}

export default App;
