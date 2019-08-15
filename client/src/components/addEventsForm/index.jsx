import React , {useEffect,useState} from 'react'
import M from 'materialize-css/dist/js/materialize';
import Axios from 'axios';
import { fetchjwt } from '../../util functions/fetchdata';
function AddEvents(props) {
const [events,addEvent] = useState({})

    const handleChange = (e) =>{
      e.preventDefault()
      addEvent({...events,[e.target.name]:e.target.value}); 
    }
    const handleFileSelected = event =>{
     const image = event.target.files[0];
      addEvent({...events, image:image})
              console.log(events)


  }
    useEffect(()=>{
     const elems = document.querySelectorAll('.modal');
       M.Modal.init(elems, {});
    })
     const handleSubmit = (e) =>{
      e.preventDefault()
      if(events.image && events.name && events.description){
        console.log(events)
      const jwt = fetchjwt()
       const file = events.image;
        const formdata = new FormData();
        formdata.append('image',file);
        formdata.append('name',events.name);
        formdata.append('confirm',events.confirm);
        formdata.append('description',events.description);
      console.log(events);
      const headers = {
        headers:{AUTH_TOKEN:jwt},
        'Content-Type':'multipart/form-data'
      }
      Axios.post('/api/events',formdata,headers).then(()=>{
        
        props.history.push('./events')
      })
      }

    }

    return (
<div>
  {/* Modal Structure */}

      <div className="container">
      <h4 className='center'>Create/Edit event</h4>
       <form onSubmit={handleSubmit} >

                        <div className="input-field">
                        <input type="text" name='name' onChange={handleChange} />
                        <label htmlFor="name">name</label>
                        </div>

                        <div className="input-field">
                        <input type="text" name='description' onChange={handleChange}  />
                        <label htmlFor="description">description</label>
                        </div>

                        <div className="input-field">
                        <input type="text" name='confirm' onChange={handleChange}  />
                        <label htmlFor="confirm">confirmation Link</label>
                        </div>

                        <div className="input-field">
                        <input type="file" name='image' onChange={handleFileSelected}  />
                        </div>

                        <div className="input-field">
                        <button className="btn">submit</button>
                        </div>
                    </form>
                    </div>
    </div>
 
 

          
    )
}

export default AddEvents
