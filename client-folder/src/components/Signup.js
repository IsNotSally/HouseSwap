import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signup } from '../apiService';
import { handleChange, setUserLogin } from '../redux/userSlice';

export default function Signup({handleClose,handleLoginClick}) {
 const dispatch= useDispatch()
 const navigate = useNavigate()
 
  const {formData } = useSelector(store => store.users)

  const handleInputChange = (e) => {
    dispatch(handleChange(e.target));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const user = formData;
    const res = await signup(user);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      alert(`${res.message}`);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('userId', res._id)
      dispatch(setUserLogin())
      // navigate(`/dashboard/${res._id}`)
    }
  };
  
  return (
    <div className="modal" id="signup-modal">
      <div className="card">
        <button onClick={handleClose} className="close-button">X</button>
        <h2>Sign up for free!</h2>
        <form className="form" onSubmit={handleSignUpSubmit} >
          <label>
            User name
            <input type="text" name='name' value={formData.name} placeholder="Enter name" onChange={handleInputChange} />
          </label>
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
        <p>Already have an account? <button onClick={()=>handleLoginClick()}>Sign in</button></p>
      </div>
    </div>
  )
}
