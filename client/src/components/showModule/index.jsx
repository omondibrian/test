import React,{Fragment}  from 'react'
import { fetchjwt } from '../../util functions/fetchdata';
import Axios from 'axios';

 function ShowModules(props) {
    console.log( 'from Show modules',props.modules)
    let moduls = props.modules
    let  modulz
    if(props.modules.length > 0){
        
     modulz = moduls.map(mod=><Module trigger={props.update} key={mod._id} mod={mod} />)
    }
    return (
        <div className="col s12 l6  ">
            {/* list of modules */}
            <ul >
            <h4 className='center' >Available Modules</h4>
               {
                 modulz   
               }
            </ul>
        </div>

    )
}
export default ShowModules
const Module = ({mod,trigger}) =>{
      const handleDelete = ()=>{
                console.log(mod._id)
            if(mod._id){
                const jwt = fetchjwt()
                Axios.delete(`api/modules/${mod._id}`,{headers:{AUTH_TOKEN:jwt}}).then(()=>{
                  alert('deleted');
                    trigger()
                })
            }
        }
    return (
        <Fragment>
        <li  className= 'justified'key={mod._id}>{mod.name}
         <a onClick={handleDelete} className="btn-floating red waves-effect waves-light btn"><i className="material-icons">delete</i></a>
        </li>
    </Fragment> 
    )
}