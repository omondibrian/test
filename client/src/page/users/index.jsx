import React,{Component} from 'react'
import Navbar from '../../components/navbar';
import ShowUsers from '../../components/showUsers';
import { fetchjwt } from '../../util functions/fetchdata'
import  Axios from 'axios';
 class  Users extends Component {
     constructor(props){
         super(props);
        }
        
        state = {
         
        }
    
    async componentDidMount() {
    const jwt = fetchjwt()
        if(!jwt){
            this. props.history.push('/login')
        }    
     const res= await Axios.get('/api/user',{headers:{AUTH_TOKEN:jwt}});
     this.setState({users:res.data});
     
    }
    
    render(){
        if(this.state.users){
            console.log('from render',this.state.users[0])
        }
    
            return (
                <section className="section ">
                    <div>
                        <Navbar />
                        <div className=" pad">
                            <h3 className="indigo-text darken-2 center">Users</h3>
                          <ShowUsers users={this.state.users} />
                        </div>
                    </div>
                </section>
            )
        }
} 

export default Users
