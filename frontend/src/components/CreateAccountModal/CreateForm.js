import React, {useState} from 'react';
import { useDispatch} from 'react-redux';

import * as sessionActions from '../../store/session';
import './CreateForm.css';

function Create() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({email, username,firstName,lastName, password}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors)
                setErrors(data.errors);
            });
        }

        return setErrors(['Confirm Password field must be the same as the Password field']);
    };



    return (
        <div className='logModalContainer'>
        <form onSubmit={handleSubmit} className='logModal'>
            <h2  style={{display: 'flex', justifyContent: 'center', alignItems: 'end'}}>Create Account</h2>
            <ul>
                {errors.map((error, id) =>
                <li key={id}>{error}</li>
                )}
            </ul>
                <input
                placeholder='Email'
                className='input'
                type='text'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                />
                <br/>
                <input
                placeholder='Username'
                className='input'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <br/>
                <input
                placeholder='First Name'
                className='input'
                type='text'
                name='firstName'
                value={firstName}
                onChange={e => setFirstname(e.target.value)}
                required
                />
                <br/>
                <input
                placeholder='Last Name'
                className='input'
                name='lastName'
                type='text'
                value={lastName}
                onChange={e => setLastname(e.target.value)}
                required
                />
                <br/>
                <input
                placeholder='Password'
                className='input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <br/>
                <input
                placeholder='Confirm Password'
                className='input'
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                />
                <br/>
            <button className='button' style={{backgroundColor: '#ff5500'}} type='submit'>Sign Up</button>
                <br/>
        </form>
        </div>
    )
}

export default Create;
