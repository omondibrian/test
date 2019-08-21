import React,{useEffect,useState} from 'react'
import Navbar from '../../components/navbar';
import EventsCard from '../../components/eventsCard';
import M from 'materialize-css/dist/js/materialize';
import {NavLink} from 'react-router-dom'
import Axios from 'axios';
import { fetchjwt } from '../../util functions/fetchdata';
function Events() {
    const [state,setState] = useState({})
    const [trigger,setTrigger] = useState(false)
    useEffect(()=>{
            const jwt = fetchjwt()
        if(!jwt){
            this. props.history.push('/login')
        } 
         const elems = document.querySelectorAll('.fixed-action-btn');
          M.FloatingActionButton.init(elems,{})
           Axios.get('/api/events')
          .then((res)=>{
              setState({events:res.data.Events});
              console.log(res.data.Events,'response')
          }).catch((err)=>{
              console.log(err)
          })
    },[trigger])
    let eventsPosted;
    if(state.events){
       
      eventsPosted =  state.events.map(event => <EventsCard key={event._id} id={event._id} setTrigger={setTrigger} event={event} />)
    }
    return (
         <section className="section ">
            <Navbar />
            <div className=" pad">
                <h3 className="grey-text lighten-2 center">
                    Upcaming Events
                </h3>
                <div className="row">
                      {eventsPosted} 
                    </div>
                    <hr/>
                </div>
           <div className="fixed-action-btn">
                <a className="btn-floating btn-large red">
                    <i className="large material-icons">mode_edit</i>
                </a>
                <ul>
                    <li><NavLink className=" btn-floating blue waves-effect waves-light btn modal-trigger" to='/newEvent'> <i className="material-icons ">add</i> </NavLink></li>

                </ul>
        </div>
            
         </section>
    )
}

export default Events
