import { useState } from 'react';
import useInput from './hooks/useInput';
import './LoginForm.css'

function LoginForm() {

  const [usernameValue, usernameBinding, usernameReset] = useInput('')
  const [passwordValue, passwordBinding, passwordReset] = useInput('')

  const submithandler = (event) => {
    event.preventDefault()
    alert(`Hello ${usernameValue} From Sabzlearn.ir :))`)
    usernameReset()
    passwordReset()
  }

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={submithandler}>
          <input type="text"
            {...usernameBinding}
            placeholder="Username" />

          <input type="password"
            {...passwordBinding}
            placeholder="Password" />
          <button>login</button>
          <p className="message">Not registered? <a href="#">Create an account</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
