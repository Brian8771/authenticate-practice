import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
    const History = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) =>
    state.session.user);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');

    if (sessionUser.username) return <Redirect to="/" />
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
        History.push('/')
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, id) =>
                <li key={id}>{error}</li>
                )}
            </ul>
            <label>
                Email
                <input
                type='text'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label>
                Username
                <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </label>
            <label>
                First Name
                <input
                type='text'
                name='firstName'
                value={firstName}
                onChange={e => setFirstname(e.target.value)}
                />
            </label>
            <label>
                Last Name
                <input
                name='lastName'
                type='text'
                value={lastName}
                onChange={e => setLastname(e.target.value)}
                />
            </label>
            <label>
                Password
                <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <label>
                Confirm Password
                <input
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                />
            </label>
            <button type='submit'>Sign Up</button>
        </form>
    )
}

export default SignupFormPage;
