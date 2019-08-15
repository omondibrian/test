import React ,{useState} from 'react'
import './style.css';
import axios from 'axios';
function LoginForm(props) {
  const handleClick = ()=>{
     const url='/api/user/login';
      axios.post(url,{
        email:state.email, password:state.password
      }).then(res =>{ localStorage.setItem('AUTH_TOKEN',res.data)} ).then(
          ()=>props.history.push('/events')
      )
     
    
  }
  const [state,setState] = useState({ email:'',password:''});
  const handleChange = (e) =>{
      setState({...state,[e.target.name]:e.target.value})
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
                <div className="form-field">
                    <label htmlFor="username">Email</label>
                    <input type="text" onChange={handleChange}  value={state.email}  name='email'/>
                </div><br/>
                <div className="form-field">
                    <label htmlFor="Password">Password</label>
                    <input type="password" onChange={handleChange} value={state.password}  name='password'/>
                </div><br/>
                <div className="form-field">
                    <button className="btn-large teal" onClick={handleClick}> login </button>
                </div><br/>
                <small className='grey-text'><a href="/login"> don't have an account</a></small>
                </div>
            </div>
        </div>
        </div>
</div>
    )
}

export default LoginForm
