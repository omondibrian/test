import React ,{useEffect,useState} from 'react'
import './style.css';
import M from 'materialize-css/dist/js/materialize';
import axios from 'axios';


/**
 * @description checks for the validity of the data passed
 * @param {*} formErrors 
 */
const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {
       val && val.length && (valid = false)
    });
    return valid
}


//regular expression for validating the email address
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
function RegistrationForm(props) {
 //initial state
    const initialState = {
        formErrors:{
            name:'', email:'',password:'',regNumber:'',dateOfBirth:'',
            password:'', profileImage:'',
        },
        name:'',
        email:'',
        password:'',
        regNumber:'',
        dateOfBirth:'',
        password:'',
        profileImage:'',
        authErrors:''
    }
    //component state
    const [state,setState] = useState(initialState);   
//function used to handle events when the user registers
  const HandleSubmit = ()=>{
    if(formValid(state.formErrors)){
       localStorage.clear('AUTH_TOKEN')
      
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
        'Content-Type':'multipart/form-data'
      }
      axios.post(url,formData,headers)
      .then(
          (res)=>{
                props.history.push('verify');
                console.log(res.data)
                alert(res.data.message)
          })
      .catch(err =>{
 if(err) setState({...state,authErrors:'invalid Credentials , make sure that your email or registration number are filled correctly'})
        } ) 
 
     } 
    } 
  }
  const handleClick = (e) =>{
    let formErrors = state.formErrors;
      const {name,value} = e.target
      
      switch(name){
        case 'name':
                formErrors.name = value.length < 6 && value.length > 0
                ?"minmum length for name is 6 characters":null
                break;
        case 'email':
                formErrors.email = emailRegex.test(value) && value.length > 0
                ?"":"invalid email address"
                break;
        case 'regNumber':
                formErrors.regNumber = value.length < 12 && value.length > 0
                ?"minmum length for registration number is 12":null
                break;
        case 'dateOfBirth':
                formErrors.dateOfBirth = value.length < 0
                ?"minmum value for password should not be less than 6":null
                break;
        case 'profileImage':
                formErrors.profileImage = value.length > 0
                ?"select a profile image for your account":null
                break;
        case 'password':
                formErrors.password = value.length < 6 && value.length > 0
                ?"minmum value for password should not be less than 6":null
                break;
      }
  setState({...state,[e.target.name]:e.target.value,formErrors})
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
<div className="container body">
    <div className="row login" style={{paddingTop:100}} >
        <div className="col s12 l4 offset-l4">
            <div className="card">
                <div className="card-action teal lighten-2 ">
                <h3 className='center '>Registration Form </h3>
                </div>
                <div className="card-content">
                {
                   state.authErrors  ?
                    <span className="red-text">{state.authErrors}</span>:null
                }
                <div className="form-field">
                    <label htmlFor="name">Username</label>
                    <input type="text" name='name' id='name' onChange={handleClick}/>
                </div><br/>{
                    state.formErrors.name && state.formErrors.name.length > 0 ?
                    <span className="red-text">{state.formErrors.name}</span>:null
                }
                <div className="form-field">
                    <label htmlFor="email">email</label>
                    <input type="text" name='email' id='email' onChange={handleClick}/>
                </div><br/>{
                    state.formErrors.email && state.formErrors.email.length > 0 ?
                    <span className="red-text">{state.formErrors.email}</span>:null
                }
                <div className="form-field">
                    <label htmlFor="regNumber">registration Number</label>
                    <input type="text" name='regNumber'  onChange={handleClick} />
                </div><br/>{
                    state.formErrors.regNumber && state.formErrors.regNumber.length > 0 ?
                    <span className="red-text">{state.formErrors.regNumber}</span>:null
                }
                <div className="form-field">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input type="date" name='dateOfBirth'  onChange={handleClick}/>
                </div><br/>{
                    state.formErrors.dateOfBirth && state.formErrors.dateOfBirth.length > 0 ?
                    <span className="red-text">{state.formErrors.dateOfBirth}</span>:null
                }
                <div className="form-field">
                   <input type="file" name="profileImage"  onChange={handleFileSelected}  id="ProfileImage"/> 
                   
                </div><br/>{
                    state.formErrors.profileImage && state.formErrors.profileImage.length > 0 ?
                    <span className="red-text">{state.formErrors.profileImage}</span>:null
                }
                <div className="form-field">
                    <label htmlFor="Password">Password</label>
                    <input type="password"  onChange={handleClick} name='password'/>
                </div><br/>{
                    state.formErrors.password && state.formErrors.password.length > 0 ?
                    <span className="red-text">{state.formErrors.password}</span>:null
                }
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


