import React ,{useEffect,useState} from 'react'
import './style.css';
import M from 'materialize-css/dist/js/materialize';
import axios from 'axios';
import { fetchjwt } from '../../util functions/fetchdata';
function RegistrationForm(props) {
    //handles the state of the registration component
    const [state,setState] = useState({});
//function used to handle events when the user registers
  const HandleSubmit = ()=>{
      const jwt = fetchjwt()
      const url = '/api/user/register'
        if(state.profileImage){
      const formData = new FormData();
      formData.append('name',state.name)
      formData.append('email',state.email)
      formData.append('regNumber',state.regNumber)
      formData.append('dateOfBirth',state.dateOfBirth)
      formData.append('password',state.password)
      formData.append('profileImage',state.profileImage);
       const headers = {
        headers:{AUTH_TOKEN:jwt},
        'Content-Type':'multipart/form-data'
      }
      axios.post(url,formData,headers).then(
          (res)=>{
                props.history.push('verify');
                console.log(res)
                alert(res.data)
          }
            
    ).catch(e =>{
        console.log(e);
        alert(e,'please use another email')
        } )  
    }  
  }
  const handleClick = (e) =>{
      setState({...state,[e.target.name]:e.target.value})
  }
//handle all events when the component is mounted to thhe dom
  useEffect(()=>{
     const elems = document.querySelectorAll('.datePicker');
      M.Datepicker.init(elems,{});
  });
//handle the selected file to be uploaded to the backend api
  const handleFileSelected = event =>{
     const image = event.target.files[0];
      setState({...state, profileImage:image})

  }

    return (
<div className="container background">
    <div className="row login" style={{paddingTop:100}} >
        <div className="col s12 l4 offset-l4">
            <div className="card">
                <div className="card-action teal lighten-2 ">
                <h3 className='center '>Registration Form </h3>
                </div>
                <div className="card-content">
                <div className="form-field">
                    <label htmlFor="name">Username</label>
                    <input type="text" name='name' id='name' onChange={handleClick}/>
                </div><br/>
                <div className="form-field">
                    <label htmlFor="email">email</label>
                    <input type="text" name='email' id='email' onChange={handleClick}/>
                </div><br/>
                <div className="form-field">
                    <label htmlFor="regNumber">registration Number</label>
                    <input type="text" name='regNumber'  onChange={handleClick} />
                </div><br/>
                <div className="form-field">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input type="date" name='dateOfBirth'  onChange={handleClick}/>
                </div><br/>
                <div className="form-field">
                   <input type="file" name="profileImage"  onChange={handleFileSelected}  id="ProfileImage"/> 
                   
                </div><br/>
                <div className="form-field">
                    <label htmlFor="Password">Password</label>
                    <input type="password"  onChange={handleClick} name='password'/>
                </div><br/>
                <div className="form-field">
                    <button className="btn-large teal" onClick={HandleSubmit}> Register </button>
                     <small className='grey-text'><a href="/login"> already have an account</a></small>
                </div><br/>
                </div>
            </div>
        </div>
        </div>
</div>
    )
}

export default RegistrationForm
