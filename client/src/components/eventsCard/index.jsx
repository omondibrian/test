import React from 'react'
import { fetchjwt } from '../../util functions/fetchdata';
import Axios from 'axios';
import {NavLink} from 'react-router-dom'

export default function EventsCard(props) {
    const handleDelete = ()=>{
                console.log(props.id)
            if(props.id){
                const jwt = fetchjwt()
                Axios.delete(`api/events/${props.id}`,{headers:{AUTH_TOKEN:jwt}}).then(()=>{
                  props.setTrigger(true)
                })
            }
        }
    
    return (
         <div className="col s12 l3">
        <div className="card" >
        <div style={{width:100,height:100}} className="card-image waves-effect waves-block waves-light">
            <img className=" responsive-img center activator"  src={props.event.image} />
        </div>
        <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{props.event.name}<i  className="material-icons right">more_vert</i></span>
            <p><NavLink to={props.event.confirm}>confirm </NavLink></p>
        </div>
        <div className="card-reveal">
            <span  className="card-title grey-text text-darken-4">{props.event.name}<i className="material-icons right">close</i></span>
            <p>{props.event.description}</p>
             <a onClick={handleDelete} className="btn-floating red waves-effect waves-light btn"><i className="material-icons">delete</i></a>
        </div>
        </div>
        </div>

    )
}
