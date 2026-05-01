import React, { useState } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`landing-container ${darkMode ? "dark" : "light"}`}>

      {/* Header */}
      <header className="header">
        <div className="logo">شارژینو</div>
        <nav className="nav">
          <a href="/login" className="nav-link">ورود</a>
          <a href="/register" className="btn-primary">ثبت‌نام</a>
          <button onClick={toggleTheme} className="theme-toggle">
            {darkMode ? "تم روشن" : "تم تاریک"}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>اعتماد و اطمینان در مدیریت شارژ ساختمان</h1>
          <p>با شارژینو، با خیال راحت پرداخت و مدیریت شارژ ساختمان را انجام بده</p>
          <a href="/register" className="hero-btn">شروع کن</a>
        </div>
        <div className="hero-image">
          <img src="./public/hero.jpg" alt="hero" />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>امکانات سیستم</h2>
        <div className="features-grid">
          <div className="feature-box">پرداخت آنلاین شارژ</div>
          <div className="feature-box">مشاهده واحدها و صورت‌حساب‌ها</div>
          <div className="feature-box">سیستم اعلان و اطلاع‌رسانی</div>
          <div className="feature-box">پنل مدیریت پیشرفته</div>
        </div>
      </section>

      {/* About */}
      <section className="about">
        <div className="about-grid">
          <div className="about-image">
            <img src="./public/aboutus.jpg" alt="درباره شارژینو" />
          </div>
          <div className="about-content">
            <h2>درباره شارژینو</h2>
            <p>
              شارژینو یک پلتفرم هوشمند و امن برای مدیریت مالی ساختمان‌هاست که با هدف
              افزایش شفافیت، دقت و سرعت در امور شارژ طراحی شده است. ماموریت ما
              ساده‌سازی مدیریت ساختمان و ایجاد تجربه‌ای جدید برای ساکنین و مدیران است.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how">
        <h2>چطور کار می‌کنه؟</h2>
        <div className="how-grid">
          <div className="how-box">
            <h3>ثبت‌نام</h3>
            <p>مدیر یا ساکن ثبت‌نام می‌کند و ساختمان را اضافه می‌کند.</p>
          </div>
          <div className="how-box">
            <h3>مدیریت واحدها</h3>
            <p>واحدهای ساختمان ثبت می‌شوند و شارژها تعیین می‌گردد.</p>
          </div>
          <div className="how-box">
            <h3>پرداخت آنلاین</h3>
            <p>ساکنان با درگاه امن شارژ ماهانه را پرداخت می‌کنند.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-box">
          <h3>+۱۲,۰۰۰</h3>
          <p>پرداخت موفق</p>
        </div>
        <div className="stat-box">
          <h3>+۳۵۰</h3>
          <p>ساختمان فعال</p>
        </div>
        <div className="stat-box">
          <h3>۹۹٪</h3>
          <p>میزان رضایت کاربران</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>سوالات متداول</h2>
        <details>
          <summary>آیا پرداخت‌ها امن هستند؟</summary>
         <p>
بله، تمامی پرداخت‌ها از طریق درگاه‌های معتبر و رسمی بانکی انجام می‌شود که از جدیدترین استانداردهای امنیتی و پروتکل‌های رمزنگاری استفاده می‌کنند. اطلاعات بانکی کاربران به‌صورت مستقیم در اختیار بانک قرار می‌گیرد و در هیچ مرحله‌ای در سامانه ما ذخیره یا نگهداری نمی‌شود. همچنین این درگاه‌ها تحت نظارت شبکه شاپرک و بانک مرکزی فعالیت می‌کنند تا امنیت، حریم خصوصی و صحت تراکنش‌ها به‌طور کامل تضمین شود.
        </p>
        </details>
        <details>
          <summary>آیا امکان مدیریت چند ساختمان وجود دارد؟</summary>
          <p>
بله، مدیر می‌تواند بدون هیچ محدودیتی تعداد نامحدودی ساختمان را به پنل خود اضافه کرده و تمامی آن‌ها را به‌صورت یکپارچه مدیریت کند. این امکان به مدیران کمک می‌کند تا اطلاعات واحدها، ساکنان، هزینه‌ها، شارژها و گزارش‌های مالی هر ساختمان را به‌صورت مجزا اما در یک داشبورد واحد مشاهده و کنترل کنند، بدون نیاز به ایجاد حساب‌های کاربری جداگانه.
         </p> 
        </details>
        <details>
          <summary>هزینه استفاده از سیستم چقدر است؟</summary>
          <p>
در حال حاضر استفاده از تمامی امکانات سامانه به‌صورت کاملاً رایگان در اختیار کاربران قرار دارد. در آینده و هم‌زمان با اضافه شدن قابلیت‌های پیشرفته‌تر و ابزارهای حرفه‌ای مدیریت، پلن‌های متنوعی متناسب با نیاز مدیران ساختمان معرفی خواهد شد تا هر کاربر بتواند بهترین گزینه را انتخاب کند.
          </p>
        </details>
      </section>

      {/* Contact Us */}
      <section className="contact">
        <h2>تماس با ما</h2>
        <div className="contact-grid">
          <form className="contact-form">
            <input type="text" placeholder="نام شما" />
            <input type="email" placeholder="ایمیل" />
            <textarea placeholder="پیام شما"></textarea>
            <button>ارسال پیام</button>
          </form>
          <div className="contact-info">
            <h3 className="info-title">راه‌های ارتباطی</h3>
            <p>📍 لرستان،خرم آباد </p>
            <p>📞 0916-000-0000</p>
            <p>✉ charjino@gmail.com</p>
          </div>
        </div>

        {/* تصویر پس‌زمینه بلور زیر باکس‌ها */}
        <div className="contact-bg-image">
          <img src="./public/map.jpg" alt="Contact Background" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <input type="email" placeholder="ایمیل خود را وارد کنید" />
        <button className="subscribe-btn">عضویت</button>
        <p>© 2025 شارژینو — همه حقوق محفوظ است.</p>
      </footer>

    </div>
  );
}
