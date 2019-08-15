import React, { useEffect,useState } from 'react';
import Navbar from '../../components/navbar';
import Doughnutgraph from '../../components/donutgraph';
import './style.css'
import ShowModules from '../../components/showModule';
import ModulesForm from '../../components/ModulesForm';
import Piechart from '../../components/pieChart';

import {
    fetchRegisteredModules,
     
     fetchLineGraphDataForModuleRegistration,
     FetchDoughnutDataForFeesPaid    }from '../../util functions/fetchdata';
import Axios from 'axios';



const Modules  = (props) => {
    const [modules,setModules] = useState({})
    const [fetchdata,setFetchData] = useState(false);
    const [registeredModules,setRegisteredModules] = useState({});
    const [ donutgraph,setDoughnut] = useState({});


        

useEffect(()=>{
     Axios.get('/api/modules').then((res)=>{
                console.log(res.data.modules)
               setModules(res.data.modules)
            })
   
     setDoughnut( FetchDoughnutDataForFeesPaid());
     setRegisteredModules(fetchRegisteredModules());
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



