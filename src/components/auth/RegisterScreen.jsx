import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator';
import { removeError, setError } from '../../redux/actions/uiActionCreators';
import { startRegisterWithEmailPasswordName } from '../../redux/actions/authActionCreators';
import { NavBarGeneric } from '../NavbarGeneric';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    //pintar errores en formulario
    const {msgError} = useSelector(state => state.ui)

    const [formValues, handleInputchange] = useForm({
        name:'David',
        email: 'davicum@gmail.com',
        password: '123456',
        password2:'123456',
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }  
    };

    const isFormValid = ()=>{
        if(name.trim().length === 0){
            dispatch( setError('Name is required'))
            return false;
        }else if( !validator.isEmail( email )){
            dispatch( setError('Email is not valid'))
            return false;
        } else if( password !== password2 || password.length < 5){
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }
        dispatch(removeError())
        return true;
    }

    return (
        
        <>
        <NavBarGeneric/>

        
        <div className="auth__main">
            <div className="auth__box-container">
            <h3 className="auth__title">Register</h3>
            
                
            
            <form onSubmit={handleRegister}>

                {
                    msgError &&
                    
                        
                        (
                            <div className="auth__alert-error ">
                                {msgError}
                            </div>
                        )
                        
                    
                }
            
                <input
                        className="auth__input"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleInputchange}
                    />

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

                 <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={handleInputchange}
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
        </div>
        
        </>
    )
}
