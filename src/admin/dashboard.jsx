import React, {Component} from 'react';  
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService';
 



class Dashboard extends Component{
    

    componentDidMount(){ 
        
    }

    getUsers= async () =>{ 
        // sample axios.get(apiEndPoint('get'), { headers: {"Authorization" : `Bearer ${getJwt()}`} })

        axiosApiInstance.get(apiEndPoint('get') )
        .then(res => {
            console.log(res.data); 
        }) 
    }




    render(){
        
        return ( 
            <React.Fragment> 
               

                    

                    <main className="container whitebg text-left body-content">
                         <h2>HERE AT NATIONS WE ENDEAVOUR TO CONNECT PEOPLE WITH GOD AND HIS PEOPLE IN A LIFE-CHANGING WAY THROUGH:</h2>   
                         <p>Inspiring worship led by our great worship team. Opportunities for the Holy Spirit to move through corporate prayer and ministry.</p> 
                         <p>Life-changing messages shared from the Bible every Sunday. Excellent children’s programmes for children 2 years of age to school year 6 every Sunday morning. A dedicated feeding room and crèche for babies and toddlers.</p>

                         <div className="row">  
                            <div className="col-md-3">
                                <img className="mb-4" src={"/pw.png"}  className="img-thumbnail"    alt="logo"  />
                            </div>
                            <div className="col-md-9">
                                <p>Nations Church<br />
                                 334 King Edward Street,<br />
                                 Dunedin, Otago, 9012,<br />
                                 New Zealand<br />
                                <a href="tel:(03) 4551888" rel="tel" className="Footer-business-info-item Footer-business-info-item--phone">(03) 4551888</a> <br />
                                <a href="mailto:admin@nations.co.nz" title="admin@nations.co.nz" target="_blank" className="Footer-business-info-item Footer-business-info-item--email">admin@nations.co.nz</a>
                                 </p>
                            </div> 
                        </div>   

                    </main> 
 
           </ React.Fragment>
        )
    }
}

export default  Dashboard;