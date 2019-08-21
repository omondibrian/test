import React ,{useState} from 'react'
import './style.css';
import axios from 'axios';
import { fetchjwt } from '../../util functions/fetchdata';
 const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {
       val && val.length && (valid = false)
    });
    return valid
}
function LoginForm(props) {
    //initial state
    const initialState = {
        formErrors:{
            email:'',password:''
        },
        email:'',
        password:'',
        authErrors:''
    }
    //component state
    const [state,setState] = useState(initialState);

/**it triggered on each  onClick event in the form */
  const handleClick = ()=>{
    if(formValid(state.formErrors)){
       localStorage.clear('AUTH_TOKEN')
     const url='/api/user/login';
      axios.post(url,{
        email:state.email, password:state.password
      })
    .then(res =>{ localStorage.setItem('AUTH_TOKEN',res.data)} )
    .then(setState({...state,authErrors:''}))
    .catch((err) => {
        if(err) setState({...state,authErrors:'invalid Credentials , make sure that your email and password are correct'})
    })
    .then(
         () =>{
            if(fetchjwt()) props.history.push('/events') 
         } 
    )
    
    //   .then(res =>{ localStorage.setItem('AUTH_TOKEN',res.data)} )
        }
  }
  const handleChange = (e) =>{
      let formErrors = state.formErrors;
      const {name,value} = e.target
      
      switch(name){
        case 'email':
                formErrors.email = emailRegex.test(value) && value.length > 0
                ?"":"invalid email address"
                break;
        case 'password':
                formErrors.password = value.length < 6 && value.length > 0
                ?"minmum value for password should not be less than 6":null
                break;
      }
      setState({...state,[e.target.name]:e.target.value,formErrors})
    
  }
    return ( 
<div className="container background">
    <div className="row login" style={{paddingTop:100}} >
        <div className="col s12 l4 offset-l4">
            <div className="card">
                <div className="card-action teal lighten-2 ">
                <h3 className='center '>Login</h3>
                </div>
                <div className="card-content">
                {
                   state.authErrors  ?
                    <span className="red-text">{state.authErrors}</span>:null
                }
                <div className="form-field">
                    <label htmlFor="username">Email</label>
                    <input type="text" onChange={handleChange}  value={state.email}  name='email'/>
                </div><br/>{
                    state.formErrors.email.length > 0 ?
                    <span className="red-text">{state.formErrors.email}</span>:null
                }
                <div className="form-field">
                    <label htmlFor="Password">Password</label>
                    <input type="password" onChange={handleChange} value={state.password}  name='password'/>
                </div><br/>{
                   state.formErrors.password && state.formErrors.password.length > 0 ?
                    <span className="red-text">{state.formErrors.password}</span>:null
                }
                <div className="form-field">
                    <button className="btn-large teal" onClick={handleClick}> login </button>
                </div><br/>
                <small className='grey-text'><a href="/register"> don't have an account ?   </a></small>
                <small className='black-text right'><a href="/api/user/forgotpass"> forgot password</a></small>
                </div>
            </div>
        </div>
        </div>
</div>
    )
}

export default LoginForm
