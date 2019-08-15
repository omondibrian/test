import React from 'react'
import Navbar from '../../components/navbar';
import Piechart from '../../components/pieChart';
import { fetchRegisteredModules, FetchDoughnutDataForFeesPaid, fetchLineGraphDataForModuleRegistration } from '../../util functions/fetchdata';
import Doughnutgraph from '../../components/donutgraph';
import LineChart from '../../components/line';

function Dashboard() {
    let data = fetchRegisteredModules();
    return (
        <section className="section ">
            <div>
                <Navbar />
                <div className=" pad">
                    <h3 className="indigo-text darken-2 center">Analytics</h3>
                   <div className="row hide-on-med-and-down">
                        <div className="col s12 l4 ">
                       <Piechart piechartdata={data} />
                       </div>
                        <div className="col s12 l4 ">
                        <Doughnutgraph data={FetchDoughnutDataForFeesPaid()} />
                        </div>
                        <div className="col s12 l4 ">
                        <Doughnutgraph data={FetchDoughnutDataForFeesPaid()} />
                        </div>
                        <h3 className="indigo-text darken-2 center" style={{marginTop:10}}>Data Comparison</h3>
                         <div className="col s12 l12 hide-on-med-and-down" style={{marginTop:30}}>
                             <LineChart data={fetchLineGraphDataForModuleRegistration()} />
                    </div>
                   </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
