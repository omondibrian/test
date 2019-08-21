import React, { useEffect,useState } from 'react';
import Navbar from '../../components/navbar';

import './style.css'
import ShowModules from '../../components/showModule';
import ModulesForm from '../../components/ModulesForm';


import Axios from 'axios';
import { fetchjwt } from '../../util functions/fetchdata';



const Modules  = (props) => {
    const [modules,setModules] = useState({})
    const [fetchdata,setFetchData] = useState(false);



        

useEffect(()=>{
        const jwt = fetchjwt()
        if(!jwt){
            this. props.history.push('/login')
        } 
     Axios.get('/api/modules').then((res)=>{
                console.log(res.data.modules)
               setModules(res.data.modules)
            })
     console.log('module rerenders')
},[fetchdata])
console.log(modules)
    const updateData = ()=>{
               setFetchData(!fetchdata);
               console.log('fetchdata',fetchdata)
           }
   
        return (
        <section className="section ">
            <Navbar />
            <div className=" pad">
               <div className="row">

               </div>

               <div className="row">
                   <div className='container' >
                       <ShowModules update={updateData} modules = {modules}/>
                       <ModulesForm  fetchdata={updateData} />
                   </div>
               </div>
            </div>
           
        </section> 
        );
    }

 export default Modules;



