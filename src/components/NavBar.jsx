import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export const NavBar = () => {
    return (
        <>
            <div className="container-xl">
                <nav class="navbar navbar-dark bg-dark" style={{ marginBottom: "1rem" }}>
                    <Link to="/">
                        <span class="navbar-brand">HOME</span>
                    </Link>
                    {/* <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                            Admin
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link to="/admin">
                                <a class="dropdown-item" href="##">Admin Home</a>
                            </Link>
                            <Link to="/adminboys">
                                <a class="dropdown-item" href="##">Admin Boys</a>
                            </Link>
                            <Link to="/adminbabyes">
                                <a class="dropdown-item" href="##">Admin Babyes</a>
                            </Link>
                            <Link to="/admingirls">
                                <a class="dropdown-item" href="##">Admin Girls</a>
                            </Link>
                            <Link to="/adminshoes">
                                <a class="dropdown-item" href="##">Admin Shoes</a>
                            </Link>
                        </div>
                    </div> */}
                    <form class="form-inline">
                        <FontAwesomeIcon style={{ fontSize: "1.2rem", color: 'white' }} icon={faUser} />
                        <Link
                            style={{ fontSize: "1.2rem", color: 'white', marginLeft: "0.5rem" }}
                            to="/auth/login"
                        >
                            Login
                        </Link>

                        <Link
                            style={{ fontSize: "1.2rem", color: 'white', marginLeft: "0.5rem" }}
                            to="/auth/register"
                        >
                            Register
                        </Link>
                    </form>
                </nav>
            </div>
        </>
    )
}


