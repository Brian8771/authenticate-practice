import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';
// import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }
  const handleDemoUser =() => {
    setCredential('Demo-lition');
    setPassword('password');
  };

  return (
    <div className='logModalContainer'>
    <form onSubmit={handleSubmit} className='logModal'>
      <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Welcome!</h2>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

        <input
          style={{fontSize: '14px'}}
          className='input'
          type="text"
          value={credential}
          placeholder='Your Email Address/Username'
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <br/>
        <input
        style={{fontSize: '14px'}}
          className='input'
          type="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>
      <button type="submit">Log In</button>
        <br/>
      <button onClick={() => handleDemoUser()}>DemoUser</button>
    </form>
    </div>
  );
}

export default LoginForm;
