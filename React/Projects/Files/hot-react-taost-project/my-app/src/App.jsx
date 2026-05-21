import { useId, useState } from "react";
import "./App.css";
import toast from "react-hot-toast";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const id = useId();

  const loginHandler = () => {
    toast.loading("در حال بررسی اطلاعات ...", {
      duration: 2000,
    });

    setTimeout(() => {
      if (username.length < 8) {
        return toast.error("نام کاربری باید حداقل 8 کاراکتر باشد");
      }

      if (password.length < 8) {
        return toast.error("گذرواژه باید حداقل 8 کاراکتر باشد");
      }

      toast.success("ورود با موفقیت انجام شد");
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-between *:w-1/2 h-screen *:h-full">
        <div>
          <div id="form">
            <header id="form-header">
              <h1 id="form-title">خوش آمدید</h1>
              <p id="form-caption">
                به پنل کاربری خود خوش آمدید, لطفا جهت ادامه اطلاعات خود را تکمیل
                نمائید.
              </p>
            </header>
            <main id="form-main">
              <div className="input-field">
                <label htmlFor={id + "username"} className="input-label">
                  نام کاربری:
                </label>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  type="text"
                  className="input-element"
                  id={id + "username"}
                  placeholder="لطفا نام کاربری یا شماره موبایل خود را وارد نمائید ..."
                />
              </div>
              <div className="input-field">
                <label htmlFor={id + "password"} className="input-label">
                  {" "}
                  گذرواژه:{" "}
                </label>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="text"
                  className="input-element"
                  id={id + "password"}
                  placeholder="********"
                />
                <div className="forgot-password-field">
                  <span className="link-text"> گذرواژه ام را فراموش کردم </span>
                </div>
              </div>
            </main>
            <footer className="grow space-y-3 w-full!">
              <div className="flex items-center gap-1">
                <input type="checkbox" id={id + "remember-me"} />
                <label
                  htmlFor={id + "remember-me"}
                  className="remember-me-label"
                >
                  لطفا مرا به خاطر بسپار.
                </label>
              </div>
              <button id="submit-button" onClick={loginHandler}>
                ادامه و ورود
              </button>
              <div className="hasnt-account-field">
                <div className="hasnt-account">
                  <p className="field-label">حساب کاربری ندارید؟</p>
                  <span className="link-text"> ثبت نام کنید </span>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <div id="introduction">
          <img src="/public/images/image.png" />
        </div>
      </div>
    </>
  );
}

export default App;
