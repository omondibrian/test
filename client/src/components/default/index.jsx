import React from 'react'
import defaultpic from '../../assets/events.svg'
import {NavLink} from 'react-router-dom'
function DefaultCard() {
    return (
          <div className="col s12 l3">
            <button>
            <img className="activator responsive-img" style={{height:250 ,width:200}} src={defaultpic} />
            </button>
       
        </div>
    )
}

export default DefaultCard
