
import React, { useState } from 'react';
import StartFirebase from './firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { auth } = StartFirebase();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
            localStorage.setItem("token", userCredential.user.accessToken)
            navigate("/");
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Sign up</button>
            </form>
            <p>Already a user ? <Link to={"/login"} >Sign up</Link></p>
        </div>
    );
};

export default SignupForm;