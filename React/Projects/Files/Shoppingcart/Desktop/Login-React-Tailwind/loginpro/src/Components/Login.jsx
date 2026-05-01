import { useState } from "react"

export default function Login() {
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Welcome ✨")
    }, 1500)
  }

  return (
    <div className="relative flex flex-col lg:flex-row justify-center items-center min-h-screen bg-[#0b0908] text-white px-6 overflow-hidden">

      <div className="aurora-rosegold"></div>
      <div className="aurora-gold"></div>
      <div className="aurora-soft"></div>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${18 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              transform: `scale(${1 + Math.random()})`
            }}
          />
        ))}
      </div>

      <div className="login-shell relative w-full max-w-[1000px] flex flex-col lg:flex-row rounded-3xl overflow-hidden bg-[#120e0c]/55 backdrop-blur-xl border border-[#f6c7b6]/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

        <div className="w-full lg:w-1/2 p-10 lg:p-14">
          <h1 className="title mb-8">Beauty Glow</h1>

          <div className="mb-6">
            <label className="label">Email</label>
            <input
              className="input-field"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="login-btn"
          >
            {loading ? "Loading..." : "Log in"}
            <span className="btn-shine"></span>
          </button>

          <div className="flex justify-between mt-6 text-sm">
            <button className="lux-link">Forgot password</button>
            <button className="lux-link">Create account</button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center py-10 orb-wrapper">
          <div className="rose-container">
            <img
              src="/rosegold.png"
              alt="Rose Gold"
              className="rose-img"
              draggable={false}
            />
          </div>
        </div>

      </div>

    </div>
  )
}
