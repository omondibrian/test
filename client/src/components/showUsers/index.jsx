import React,{useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize';
import Axios from 'axios';
import { fetchjwt } from '../../util functions/fetchdata';
import{NavLink} from 'react-router-dom'
function ShowUsers(props) {
  let users;
      useEffect(()=>{
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems,{});
      })
      if(props.users){
        console.log('show users',props.users[0]);
       users =  props.users.map(user => <User  user={user} />)
      }
      
    return (
    <ul className="collapsible popout">
     {users}
    </ul>
    )
    
}

export default ShowUsers

const User = (props) =>{
const makeAdmin = ()=>{
  const jwt=fetchjwt()
  if(props.user._id){
    console.log(props.user._id)
  const { _id} = props.user

  Axios.put('/api/user/role',{
    id:_id
  },
  {headers:{AUTH_TOKEN:jwt}}
  ).then(()=>{
    alert('user is now an admin')
  })
}
}
const userid = props.user._id;
  return (
  <li>    
    <div className="collapsible-header "> 
    <img src={props.user.profileImage} alt=""  width={60} height={60} class="circle avator"/>
      <span class="title">{props.user.name}</span></div>
    <div className="collapsible-body"><span className=' indigo-text' >email: </span>{props.user.email}</div>
    <div className="collapsible-body"><span className=' indigo-text' >Registration Number: </span>{props.user.regNumber}</div>
    <div className="collapsible-body"> <span className=' indigo-text' > date of birth: </span> {props.user.dateOfBirth}
    <NavLink onClick={(userid) => {makeAdmin(userid)}} className="right btn-floating blue waves-effect waves-light btn " > <i className="material-icons ">add</i> </NavLink>
    </div>
    </li>
 
  )
}