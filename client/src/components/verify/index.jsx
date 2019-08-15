import React,{useState} from 'react'
import axios from 'axios';
const Verify = (props) => {
     const [state,setState] = useState({});
      const handleClick = (e) =>{
      setState({...state,[e.target.name]:e.target.value})
  }
  const handleSubmit = ()=>{
      axios.post('/api/user/verify',{
          secreateToken:state.token
      }).then(()=>{
          alert('account activated successfully')
          
      }).catch(e =>{
          alert(e)
          
      })
  }
    return (
<div className="container background">
    <div className="row login" style={{paddingTop:100}} >
        <div className="col s12 l4 offset-l4">
            <div className="card">
                <div className="card-action teal lighten-2 ">
                <h3 className='center '>verify token </h3>
                </div>
                <div className="card-content">
                    <div className="form-field">
                        <label htmlFor="name">Token</label>
                        <input type="text" name='token' id='name' onChange={handleClick}/>
                    </div><br/>
                <div className="form-field">
                    <button className="btn-large teal" onClick={handleSubmit}> continue </button>
                </div><br/>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default Verify
