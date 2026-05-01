export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div className="
        w-full 
        max-w-5xl 
        bg-white 
        rounded-2xl 
        shadow-xl 
        grid 
        grid-cols-1 
        md:grid-cols-2 
        overflow-hidden
      ">

        {/* LEFT SIDE (FORM) */}
        <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center">

          <div className="flex items-center gap-2 mb-8 md:mb-10">
            <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
            <span className="font-semibold text-gray-700 text-lg">
              AppHome
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">
            Welcome back! Please enter your details.
          </p>

          <form className="space-y-5">

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  mt-1 
                  w-full 
                  px-4 py-3 
                  border border-gray-300 
                  rounded-lg 
                  focus:ring-2 focus:ring-indigo-400 
                  focus:outline-none
                "
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="
                  mt-1 
                  w-full 
                  px-4 py-3 
                  border border-gray-300 
                  rounded-lg 
                  focus:ring-2 focus:ring-indigo-400 
                  focus:outline-none
                "
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-indigo-500" />
                Remember me
              </label>

              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* MAIN SIGN-IN BUTTON */}
            <button
              className="
                w-full 
                py-3 
                text-white 
                font-medium 
                rounded-lg 
                bg-gradient-to-r 
                from-blue-500 
                to-purple-500 
                hover:opacity-90 
                transition
              "
            >
              Log in
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="
                w-full 
                py-3 
                border border-gray-300 
                rounded-lg 
                flex 
                items-center 
                justify-center 
                gap-3 
                bg-white 
                hover:bg-gray-50 
                transition
              "
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google"
              />
              <span className="text-sm font-medium text-gray-700">
                Log in with Google
              </span>
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don't have an account?{" "}
            <a className="text-indigo-600 font-medium hover:underline">
              Sign up
            </a>
          </p>

        </div>

        {/* RIGHT SIDE IMAGE (HIDDEN ON MOBILE) */}
        <div className="relative hidden md:block">

          <img
            src="/loginpage.png"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Login Visual"
          />

          <div className="
            absolute 
            inset-0 
            bg-black/25 
            flex 
            flex-col 
            items-center 
            justify-center 
            text-white 
            text-center 
            px-10
          ">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Welcome back!
            </h2>

            <p className="text-sm mb-6 opacity-90">
              Log in to continue your journey with us
            </p>

            <button className="
              px-6 py-2 
              border border-white 
              rounded-full 
              hover:bg-white 
              hover:text-black 
              transition
            ">
              Sign up
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}
