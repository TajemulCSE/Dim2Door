import React from 'react';
import './login_form.css'
export default function LoginForm() {
  return (
    <div className='login-container'>
      <div className='form-comtainer'>
        <div className='login-text'>
          <h1>Login</h1>
          </div>
          <form action="">
            <label htmlFor="email">Email: </label>
            <input type="email" placeholder='Enter your email' />

            <br /> <br />

            <label htmlFor="password">Password: </label>
            <input type="password" placeholder='Enter your password' />

            <br /> <br />

            <div className='submit-button'>
              <button>Submit</button>
            </div>

            <br />

            <div className='forget-password'>
              Forget Password?

              <a href="#">Reset Password</a>

            </div>

            <div className='not-a-member'>
              Not a member? 
              <a href="#">Register</a>

            </div>


          </form>
      </div>




    </div>
  );
}
