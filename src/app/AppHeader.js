import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

export class AppHeader extends Component {
    render() {
        return (
            <div className="main">

                <div className="first">
                    <h2><Link to="/"  className="h1"><i><b>K</b></i> now<i><b>Y</b></i>our <i><b>N</b></i>eighborhood</Link></h2>
                </div>

                {
                    this.props.authenticated ? (

                        <div className="second">
                            <NavLink to="/view" className="button">VIEW</NavLink>
                            <NavLink to="/profile" className="button">PROFILE</NavLink>
                            <a onClick={this.props.onLogout} className="button">LOGOUT</a>
                        </div>

                    ): (
                        <div className="second">
                            <NavLink to="/login" className="button">LOGIN</NavLink>
                            <NavLink to="/signup" className="button">SIGNUP</NavLink>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default AppHeader
