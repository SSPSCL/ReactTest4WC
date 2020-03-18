import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import RoversController from './rovers-controller';

const style = theme => {

};

class RoversControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            instructions: '',
            output: ''
        };
    }

    handleInputChange(event) {
        const newState = {};

        newState.instructions = event.target.value;
        const roversController = new RoversController(newState.instructions);
        const candidateOutput = roversController.Execute();
        newState.output = (roversController.Valid) ? candidateOutput : "Error";
        
        this.setState(newState);
    }

    render() {
        const { instructions, output } = this.state;

        let renderedOutput =
            (<div>
                <TextField multiline label="Rover instructions" rows={10} variant="outlined" value={instructions} onChange={(event) => this.handleInputChange(event)}></TextField>
                <TextField multiline disabled label="Rover output" rows={10} variant="outlined" value={output}></TextField>
            </div>);

        return renderedOutput;
    }
}

export default withStyles(style)(RoversControl);