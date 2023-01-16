import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../apiService';
import { handleChange, setUserLogin } from '../redux/userSlice';

export default function Login({ handleClose, handleSignupClick }) {
  
  const {formData } = useSelector(store => store.users)
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(handleChange(e.target));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = formData;
    const res = await login(user);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      alert(`${res.message}`);
      localStorage.setItem('accessToken', res.accessToken);
      dispatch(setUserLogin(res.id))
      // navigate(`/dashboard`)

    }
  };

  return (
    <div className="modal" id="login-modal">
      <div className="card">
        <button onClick={handleClose} className="close-button">X</button>
        <h2>Login</h2>
        <form className="form" onSubmit={handleSubmit} >
          <label>
            Email
            <input type="email" name='email' value={formData.email} placeholder="Enter email" onChange={handleInputChange} />
          </label>
          <label>
            Password
            <input type="password" name='password' value={formData.password} placeholder="Enter password" onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        <p>Ready to exchange? <button onClick={()=> handleSignupClick()}>Sign up for free!</button></p>
      </div>
    </div>
  )
}
