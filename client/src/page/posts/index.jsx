import React,{useEffect,useState} from 'react'
import Navbar from '../../components/navbar';
import M from 'materialize-css/dist/js/materialize';
import {NavLink} from 'react-router-dom'
import  Axios from 'axios';
import SinglePost from '../../components/editPosts';

function Posts() {
    const [state,setState] = useState({})
    const [trigger,setTrigger] = useState(false)
     useEffect(  ()=>{
             let elems = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elems,{});
      
         elems = document.querySelectorAll('.fixed-action-btn');
          M.FloatingActionButton.init(elems,{});
          Axios.get('/api/posts')
          .then((res)=>{
              setState({posts:res.data});
          }).catch((err)=>{
              console.log(err)
          })
    },[trigger])


    let Postedposts;
    if(state.posts){
      console.log(state.posts.posts.length)
     
    Postedposts = state.posts.posts.map(post =><SinglePost key={post._id} setTrigger={setTrigger} posts={post} id={post._id} /> )
    }
    return (
        <section className="section ">
            <div>
                <Navbar />
                <div className=" pad">
                    {   state.posts?
                        state.posts.posts.length === 0? <h4 className="indigo-text darken-2 center">Loading Posts .....</h4>:
                         <div>  
                            <h3 className="indigo-text darken-2 center">Posts</h3>
                            <ul className="collapsible popout">
                                    {Postedposts}
                            </ul>
                        </div>:
                        null
                    }
                </div>
            </div>
             <div className="fixed-action-btn">
                <a className="btn-floating btn-large red">
                    <i className="large material-icons">mode_edit</i>
                </a>
                <ul>
                    <li><NavLink className=" btn-floating blue waves-effect waves-light btn modal-trigger" to='/create'> <i className="material-icons ">add</i> </NavLink></li>

                </ul>
        </div>
   
</section>
    )
}

export default Posts;

