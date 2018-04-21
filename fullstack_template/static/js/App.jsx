import React from 'react';
import axios from 'axios';
import { PageHeader } from "react-bootstrap";
import { Button, Grid, Row, Col } from "react-bootstrap";

require('../css/fullstack.css');
var $ = require('jquery');

import HeaderBackgroundImage from '../images/header.jpg';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            calresult: 'Result will display here!',
            symbol: '',
            allotment: '',
            fsp: '',
            sc: '',
            isp: '',
            bc: '',
            cgtr: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPythonCalcultor = this.getPythonCalcultor.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    personaliseCalcultor(data) {
        this.setState({calresult: data });
    }

    getPythonCalcultor() {
        $.get(window.location.href + 'calculator', {
            symbol: this.state.symbol,
            allotment: this.state.allotment,
            fsp: this.state.fsp,
            sc: this.state.sc,
            isp: this.state.isp,
            bc: this.state.bc,
            cgtr: this.state.cgtr}, (data) => {
            console.log(data);
            this.personaliseCalcultor(data);
        });
    }

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Python Stock Profit Calculator</h1>
        </header>
        <form>
          <h4>Compute Your Profit:</h4>
          <p>
            <label>
              Ticker Symbol :
              <input type="text" name="symbol" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Allotment : 
              <input type="number" name="allotment" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Final Share Price :
              <input type="number" name="fsp" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Sell Commission : 
              <input type="number" name="sc" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Initial Share Price :
              <input type="number" name="isp" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Buy Commission :
              <input type="number" name="bc" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Capital Gain Tax Rate (%) :
              <input type="number" name="cgtr" onChange={this.handleChange} />
            </label>
          </p>
          <p>
          <Button bsSize="large" bsStyle="danger" onClick={this.getPythonCalcultor}>
                    Calculate
                    </Button>
          </p>
          <p>
            <textarea value={this.state.calresult} onChange={this.handleChange} cols={60} rows={25} />
          </p>
        </form>
      </div>
    );
  }
}
