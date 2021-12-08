import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { login, startGoogleLogin } from '../../redux/actions/authActionCreators';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputchange] = useForm({
        email: 'davicum@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch( login ( 123456, 'david'))
    };

    const handleLoginGoogle = () => {
        dispatch(startGoogleLogin())
    }

    return (
        <div>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}>
                <input
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputchange}
                />

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputchange}
                />

                <button
                    className="btn btn-primary btn-block"
                    type="submit">
                    Login
                </button>
                <hr />
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={ handleLoginGoogle }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link
                    className="link"
                    to="/auth/register"
                >
                    Create new account
                </Link>
            </form>

        </div>
    )
}

