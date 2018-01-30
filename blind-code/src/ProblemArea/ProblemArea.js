import React, {Component} from 'react';
import './ProblemArea.css';

class ProblemArea extends Component {

    constructor(){
        super();

    }

    render(){

        return <section className="ProblemArea" >
        
       <div > {this.props.problem} </div>
        <br/>

        Sample input : {this.props.sampleIp} <br/>
         Sample Output : {this.props.sampleOp} 
        
        </section>;
    }

}

export default ProblemArea;