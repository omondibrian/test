import React,{useEffect} from 'react';
import SidebarComponent from '../sidebar';
import {NavLink} from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize';
import './style.css'
const Navbar = () => {
    useEffect(()=>{
    const elems = document.querySelectorAll('.dropdown-trigger');
     M.Dropdown.init(elems,{});
    })
    return ( 
       <div>
  {/* Dropdown Structure */}
                <ul id="dropdown1" className="dropdown-content">
                    <li><NavLink to='/'>logout</NavLink></li>
                    <li className="divider" />
                    <li><NavLink to='/'>profile</NavLink></li>
                </ul>
            <nav>
                <div className="nav-wrapper grey">
                <NavLink to='/' className="sidenav-trigger" data-target="mobile-menu">
                    <i className="material-icons">menu</i>
                </NavLink>
                <div className="col s12 l6 left hide-on-med-and-down">
                    <form>
                    <div className="input-field"> 
                        <input id="search" type="search" required />
                        <label className="label-icon" htmlFor="search">
                        <i className="material-icons  white-text">search</i>
                        </label>
                        <i className="material-icons ">close</i>
                    </div>
                    </form>
                </div>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to='/'><i className="material-icons ">notifications</i></NavLink></li>
                    <li><NavLink to='/'><i className="material-icons circle responsive-img">person</i></NavLink></li>
                    {/* Dropdown Trigger */}
                    <li><NavLink className="dropdown-trigger" href="#!" data-target="dropdown1">Brian Omondi<i className="material-icons right">arrow_drop_down</i></NavLink></li>
                </ul>
                </div>
            </nav>
            <SidebarComponent />
</div>

     );
}
 
export default Navbar;