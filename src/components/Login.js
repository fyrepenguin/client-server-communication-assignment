import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/authSlice';

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
  let from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.currentTarget);
    let email = formData.get("email");
    dispatch(login(email))

  }

  function createNewEmail(e) {

    let formData = new FormData(e.currentTarget);
    let email = formData.get("email");
    dispatch(login(email))

  }
  useEffect(() => {
    auth.email && navigate(from, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className='login-form-container'>
        <div>
          <label>Enter Your Email</label>
          <input type="email" required name="email" />
        </div>
        <button type="submit" className="primary">Login</button>
        <button onClick={createNewEmail} className="secondary">Create A New Email</button>
      </form>
    </div>
  )
}
