import { useReducer } from "react";
import BgOverlay from "./components/BgOverlay";
import FormHeader from "./components/FormHeader";

// Pure = خالص
const userReducer = (user, action) => {
  switch (action.type) {
    case "firstName": {
      return {
        ...user,
        firstName: action.value,
      };
    }
    case "lastName": {
      return {
        ...user,
        lastName: action.value,
      };
    }
    case "email": {
      return {
        ...user,
        email: action.value,
      };
    }
    case "phone": {
      return {
        ...user,
        phone: action.value,
      };
    }
    case "birthDate": {
      return {
        ...user,
        birthDate: action.value,
      };
    }
    case "gender": {
      return {
        ...user,
        gender: action.value,
      };
    }
    case "nationality": {
      return {
        ...user,
        nationality: action.value,
      };
    }
    case "maritalStatus": {
      return {
        ...user,
        maritalStatus: action.value,
      };
    }

    case "set_products": {
      return {
        ...user,
        products: action.products,
      };
    }

    default: {
      return user;
    }
  }
};

const App = () => {
  const [user, dispatch] = useReducer(userReducer, {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    nationality: "",
    maritalStatus: "",
    products: [],
  });

  const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    dispatch({
      type: "set_products",
      products: data,
    });
  };

  return (
    <>
      <main className="w-dvw">
        <form
          className="w-[80%] mx-auto bg-white my-10 rounded-lg p-10 overflow-y-auto shadow"
          onClick={(event) => event.preventDefault()}
        >
          <section id="content-wrapper" className="w-[90%] mx-auto">
            <FormHeader />

            {/* بخش اطلاعات شخصی */}
            <div className="mt-10">
              <h2 className="text-xl text-zinc-800 font-bold mb-6">
                اطلاعات شخصی
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-700 font-medium mb-2">
                    نام
                  </label>
                  <input
                    value={user.firstName}
                    onChange={(event) =>
                      dispatch({ type: "firstName", value: event.target.value })
                    }
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="نام خود را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-2">
                    نام خانوادگی
                  </label>
                  <input
                    value={user.lastName}
                    onChange={(event) =>
                      dispatch({ type: "lastName", value: event.target.value })
                    }
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-2">
                    ایمیل
                  </label>
                  <input
                    value={user.email}
                    onChange={(event) =>
                      dispatch({ type: "email", value: event.target.value })
                    }
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-2">
                    شماره تلفن
                  </label>
                  <input
                    value={user.phone}
                    onChange={(event) =>
                      dispatch({ type: "phone", value: event.target.value })
                    }
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="09123456789"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-2">
                    تاریخ تولد
                  </label>
                  <input
                    value={user.birthDate}
                    onChange={(event) =>
                      dispatch({ type: "birthDate", value: event.target.value })
                    }
                    type="date"
                    name="birthDate"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-2">
                    جنسیت
                  </label>
                  <select
                    value={user.gender}
                    onChange={(event) =>
                      dispatch({ type: "gender", value: event.target.value })
                    }
                    name="gender"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                    <option value="prefer-not">ترجیح نمی‌دهم</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-2">
                    ملیت
                  </label>
                  <input
                    value={user.nationality}
                    onChange={(event) =>
                      dispatch({
                        type: "nationality",
                        value: event.target.value,
                      })
                    }
                    type="text"
                    name="nationality"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ایرانی"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-2">
                    وضعیت تأهل
                  </label>
                  <select
                    value={user.maritalStatus}
                    onChange={(event) =>
                      dispatch({
                        type: "maritalStatus",
                        value: event.target.value,
                      })
                    }
                    name="maritalStatus"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="single">مجرد</option>
                    <option value="married">متاهل</option>
                  </select>
                </div>
              </div>

              <div className="">
                <input
                  onClick={getProducts}
                  value="دریافت اطلاعات"
                  type="submit"
                  name="nationality"
                  className="mt-7 bg-blue-500 text-white w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>
        </form>
      </main>

      <hr />
      <br />

      <ul>
        {user.products.length
          ? user.products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))
          : null}
      </ul>
      <BgOverlay />
    </>
  );
};

export default App;
