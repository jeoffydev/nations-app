import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Errorpage extends Component{

    render(){
       
        
        return ( 
            <React.Fragment>  
                    <main className="container whitebg text-left body-content">
                        
                        <div className="row">
                            <div className="col-md-12">
                                <div className="jumbotron">
                                    <h1 className="display-4">Ooops...</h1>
                                    <p className="lead">Please pray, so that you can enter these private pages :)</p>
                                     
                                     
                                    <p className="lead">
                                        <a className="btn btn-primary btn-lg" href="/" role="button">Login</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </main>  
           </ React.Fragment>
        )
    }
}

export default Errorpage;