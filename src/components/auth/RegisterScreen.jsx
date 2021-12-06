import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
    return (
        <div>
            <h3 className="auth__title">Register</h3>
            <form>
                <input
                        className="auth__input"
                        type="text"
                        placeholder="Name"
                        name="name"
                    />

                <input
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                />

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                />

                 <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordC"
                />

                <button 
                className="btn btn-primary btn-block"
                type="submit">
                    Register
                </button>
                <hr />
               
                    <Link
                        className="link"
                        to="/auth/login"
                        >
                            Alredy register?
                    </Link>
            </form>
        </div>
    )
}
