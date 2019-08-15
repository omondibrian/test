import React , {useEffect,useState} from 'react'
import M from 'materialize-css/dist/js/materialize';
import Axios from 'axios';
import { fetchjwt } from '../../util functions/fetchdata';

const SinglePost = (props) =>{
    useEffect(  ()=>{
             let elems = document.querySelectorAll('.collapsible');
             M.Collapsible.init(elems,{});
             let el = document.querySelectorAll('.modal');
              M.Modal.init(el, {});
    })
    const { id } =props;
 
        const handleDelete = (id)=>{
                console.log(id)
            if(props.id){
                const jwt = fetchjwt()
                Axios.delete(`api/posts/${props.id}`,{headers:{AUTH_TOKEN:jwt}}).then(()=>{
                  props.setTrigger(true)
                })
            }
        }
 

  return (
  <li>    
    <div className="collapsible-header "> 
        {props.posts.imageUrl ? <img src={props.posts.imageUrl} alt={props.title}  width={60} height={60} className="circle avator"/>:null }
        <span className="title">{props.posts.title}</span></div>
        <div className="collapsible-body">
        {props.posts.mainContent}
        <a onClick={handleDelete} className="btn-floating red waves-effect waves-light btn"><i className="material-icons">delete</i></a>

        </div>
</li>
       


  )

}

export default SinglePost
