import { useState } from "react";
import "./App.css";

import swal from "sweetalert";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = () => {
    if (username.length < 8) {
      return swal({
        title: "نام کاربری صحیح نمی‌باشد",
        text: "نام کاربری حداقل باید 8 کاراکتر باشد",
        icon: "error",
        button: "متوجه شدم",
      });
    }

    if (password.length < 8) {
      return swal({
        title: "پسورد صحیح نمی‌باشد",
        text: "پسورد حداقل باید 8 کاراکتر باشد",
        icon: "error",
        button: "متوجه شدم",
      });
    }

    swal({
      title: "ثبت نام با موفقیت انجام شد",
      icon: "success",
      button: "ورود به اکانت",
    });
  };

  return (
    <>
      <div id="wrapper">
        <div id="form-card">
          <div id="image" className="bg-cover bg-center bg-no-repeat">
            <img src="/images/banner.jpg" className="auth-image" alt="" />
          </div>
          <div id="content">
            <div id="header" className="input-field">
              <h1 id="form-title">به پنل سبزلرن خوش آمدید</h1>
              <p id="form-caption">
                لطفا جهت ادامه و یادگیری ادامه دوره ری‌اکت جی‌اس وارد پنل
                کاربری‌تون بشید
              </p>
            </div>
            <div id="main" className="space-y-4">
              <div className="input-field">
                <label htmlFor="fullName" className="input-label">
                  نام کاربری:
                </label>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  type="text"
                  dir="ltr"
                  className="input-element"
                  placeholder="Username"
                />
              </div>
              <div className="input-field">
                <label htmlFor="fullName" className="input-label">
                  نام و نام خانوادگی:
                </label>
                <input
                  type="text"
                  className="fullName-input"
                  placeholder="امین سعیدی"
                />
              </div>
              <div className="input-field">
                <label htmlFor="phoneNumber" className="input-label">
                  شماره موبایل:
                </label>
                <input
                  dir="ltr"
                  id="phoneNumber-input"
                  type="tel"
                  className="input-element"
                  placeholder="09921902834"
                />
              </div>
              <div className="input-field">
                <label htmlFor="email-input" className="input-label">
                  آدرس ایمیل:
                </label>
                <input
                  type="email"
                  id="email-input"
                  dir="ltr"
                  className="input-element"
                  placeholder="peymangeek@gmail.com"
                />
              </div>
              <div className="input-field">
                <label htmlFor="password-input" className="input-label">
                  گذرواژه :
                </label>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  id="password-input"
                  dir="ltr"
                  className="input-element"
                  placeholder="********"
                />
              </div>
            </div>
            <div className="grow" onClick={registerHandler}>
              <button tabIndex="1" id="submit-button">
                ثبت نام
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="background-overlay">
        <div id="overlay-orb-1"></div>
        <div id="overlay-orb-2"></div>
      </div>
    </>
  );
}

export default App;
