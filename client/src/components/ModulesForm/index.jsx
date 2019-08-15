import React,{useState} from 'react'
import Axios from 'axios';
import { fetchjwt } from '../../util functions/fetchdata';

function ModulesForm(props) {
    const [name,setname] = useState('');
    const [description,setdescription] = useState('');
    const [fees,setfees] = useState('');
    const [image,setimage] = useState('');
    const [registrationLink,setRegistrationLink] = useState('');
    const handleClick = (e)=>{
    if(e.target.name === 'name'){
        console.log('name',e.target.value)
        setname(e.target.value)
    }    
    if(e.target.name === 'description'){
      setdescription(e.target.value)
    }    
    if(e.target.name === 'fees'){
        setfees(e.target.value)
    }    
    if(e.target.name === 'image'){
        setimage(e.target.files[0])
    }    
    if(e.target.name === 'registrationLink'){
        setRegistrationLink(e.target.value)
    }    
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
       const  formstate={};
        formstate.name = name;
        formstate.description = description;
        formstate.fees = fees;
        formstate.image = image;
        formstate.registrationLink = registrationLink;
        //todo:post data to the backend sever
        if(formstate.image){
            let formData = new FormData();
            formData.append('name',formstate.name)
            formData.append('description',formstate.description)
            formData.append('fee',formstate.fees)
            formData.append('image',formstate.image)
            formData.append('registrationLink',formstate.registrationLink);
            const jwt = fetchjwt()
             const headers = {
        headers:{AUTH_TOKEN:jwt},
        'Content-Type':'multipart/form-data'
      }
            Axios.post('/api/modules',formData,headers).then((res)=>{
                alert('sent',res);
               
            })
        }
        console.log(formstate);
        //after the post request resolves then we trigger the show modules to rerender
        //using the updated record
        props.fetchdata()
    }
    const handleEdit = ()=>{
        const  formstate={};
        formstate.name = name;
        formstate.description = description;
        formstate.fees = fees;
        formstate.image = image;
        formstate.registrationLink = registrationLink;
        //todo:post data to the backend sever
        if(formstate.name){
            let formData = new FormData();
            formData.append('name',formstate.name)
            formData.append('description',formstate.description)
            formData.append('fee',formstate.fees)
            formData.append('image',formstate.image)
            formData.append('registrationLink',formstate.registrationLink);
            const jwt = fetchjwt()
             const headers = {
        headers:{AUTH_TOKEN:jwt},
        'Content-Type':'multipart/form-data'
      }
                  Axios.put(`/api/modules/${formstate.name}`,formData,headers).then((res)=>{
                alert('updated successfully',res);
               
            })
    } 
}
    return (
            <div className="col s12 l6 ">
                {/* list of modules */}
                <h4 className="center">Edit/Add Modules</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                        <input type="text" name='name' onChange={handleClick} id="name" />
                        <label htmlFor="name">name</label>
                        </div>

                        <div className="input-field">
                        <input type="text" name='description' onChange={handleClick} id="description" />
                        <label htmlFor="description">description</label>
                        </div>

                        <div className="input-field">
                        <input type="text" name='fees' onChange={handleClick} id="fees" />
                        <label htmlFor="fees">fees</label>
                        </div>
                        <div className="input-field">
                        <input type="text" name='registrationLink' onChange={handleClick}  />
                        <label htmlFor="registrationLink">registration Link</label>
                        </div>

                        <div className="input-field">
                        <input type="file" name='image' onChange={handleClick} id="image" />
                        </div>

                        <div className="input-field">
                        <button className="btn">submit</button>
                        </div>
                    </form>
                        <div className="input-field">
                        <button className="btn" onClick={handleEdit}>edit</button>
                        </div>
            </div>
    )
}

export default ModulesForm
