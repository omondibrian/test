import React , {useState} from 'react'
import M from 'materialize-css/dist/js/materialize';
import Axios from 'axios';
import { fetchjwt } from '../../util functions/fetchdata';
function AddPosts(props) {
    const [post,addPost] = useState({});
    // if(props){addPost(props.post)}
    const handleChange = (e) =>{
      addPost({...post,[e.target.name]:e.target.value}); 
    }
    const handleFileSelected = event =>{
     const image = event.target.files[0];
      addPost({...post, imageUrl:image})

  }
    const handleSubmit = (e) =>{
      e.preventDefault()
      if(post.imageUrl){
      const jwt = fetchjwt()
       const file = post.imageUrl;
        const formdata = new FormData();
        formdata.append('imageUrl',file);
        formdata.append('title',post.title);
        formdata.append('mainContent',post.mainContent);
      console.log(post);
      const headers = {
        headers:{AUTH_TOKEN:jwt},
        'Content-Type':'multipart/form-data'
      }
      Axios.post('/api/posts',formdata,headers).then(()=>{
        props.history.push('./posts')
      })
      }

    }

    
    return (
<div>
  {/* Modal Structure */}

               <div className="container">
                   <h4 className='center'>Create Posts</h4>
                      <form  onSubmit = {e => handleSubmit(e)}>
                        <div className="input-field">
                        <input type="text" name='title' onChange={handleChange} id="title" />
                        <label htmlFor="title">title</label>
                        </div>

                        <div className="input-field">
                        <input type="text" name='mainContent' onChange={handleChange} id="mainContent" />
                        <label htmlFor="mainContent">mainContent</label>
                        </div>

                        <div className="input-field">
                        <input type="file" name='imageUrl' onChange={handleFileSelected} id="image" />
                        </div>

                        <div className="input-field">
                        <button className="btn">submit</button>
                        </div>
                    </form>
                    </div>
    </div>
  


          
    )
}

export default AddPosts
