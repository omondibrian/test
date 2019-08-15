import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import {NavLink} from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize';
import './style.css'
class SidebarComponent extends Component {
    state = {  }
    componentDidMount(){
        
    const elems = document.querySelectorAll('.sidenav');
     M.Sidenav.init(elems, {});
    }
    render() { 
        return ( 
        <ul className="  sidenav  sidenav-fixed grey  lighten-2" id="mobile-menu">
            <img src={logo} alt='logo' style={{marginTop: 20 ,paddingLeft:30}} className="responsive-img white-text" />
            {/* <li className=" sidenav-close"><NavLink to="/dashboard" className='white-text'><i className="material-icons prefix white-text">dashboard</i> dashboard</NavLink> </li> */}
            <li className=" sidenav-close"><NavLink to='/events' className="active white-text"><i className="material-icons prefix white-text">events</i>events</NavLink></li>
            <li className=" sidenav-close"><NavLink to= '/modules' className='white-text'><i className="material-icons prefix white-text">folder</i>modules</NavLink></li>

            
            <li className=" sidenav-close"><NavLink to= '/users' className='white-text'><i className="material-icons prefix white-text">person</i>users</NavLink></li>
            <li className=" sidenav-close"><NavLink to= '/posts' className='white-text'><i className="material-icons prefix white-text">chats</i>Post</NavLink></li>
            <li className=" sidenav-close bottom"><NavLink to='/' className='white-text' ><i className="material-icons prefix white-text">settings</i>settings</NavLink></li>
        </ul>
 );
    }
}
 
export default SidebarComponent;