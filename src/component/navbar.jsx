import React from 'react';
import { NavLink } from "react-router-dom";

const NavBar =({user})=>{
    return(


        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Vidly</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="container-fluid" id="navbarNav">
                <ul className="navbar-nav ">
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/movies">
                            Movies <span className="sr-only">(current)</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">
                            Customers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/rentals">
                            Rentals
                        </NavLink>
                    </li>

                </ul>
                {!user && <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">
                                Register
                            </NavLink>
                        </li>
                    </ul>
                }

                {user && <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                             {user.name}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">
                            Logout
                        </NavLink>
                    </li>
                </ul>
                }

            </div>
        </nav>




    )
};
export default NavBar;