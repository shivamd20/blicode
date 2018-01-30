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
           {(this.props.error||this.props.stderr||this.props.stdout) &&  <CheckIcon  />  }

          {this.props.running && <CircularProgress size={20} />}
          </Button>
          <Button color="accent" disabled={this.props.isSubmitting}> submit</Button>

        
        
        <div>{this.props.stdout}</div>
        <div>{this.props.stderr}</div>
        <div>{this.props.error}</div>
        
        </div>;
    }
}

export default RunResultArea;