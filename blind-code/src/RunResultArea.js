import React from 'react';
import Card from 'material-ui/Card';
import Button from 'material-ui/Button';
import CheckIcon  from 'material-ui-icons/Check';
import { CircularProgress } from 'material-ui/Progress';

class RunResultArea extends React.Component{


    render(){

     

        return <div>
           <Button color="primary" disabled={this.props.running} onClick={()=>{

            //lang,input,filename,version,code
              this.props.onRun();
          }}> run
           {(this.props.running && this.props.error||this.props.stderr||this.props.stdout) &&  <CheckIcon  />  }

          {this.props.running && <CircularProgress size={20} />}
          </Button>
          <Button color="accent" disabled={this.props.isSubmitting}> submit</Button>

        
        
       { this.props.stdout &&  <div  style={{color : 'blue'}}> <h3>Output: </h3>{this.props.stdout}</div> }
       { this.props.stderr &&  <div  style={{color : 'red'}}> <h3>stderr</h3>{this.props.stderr}</div> }
       { this.props.error &&  <div  style={{color : 'red'}}> <h3>error</h3>{this.props.error}</div> }

    
        
        </div>;
    }
}

export default RunResultArea;