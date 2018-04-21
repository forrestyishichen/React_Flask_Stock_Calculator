import React from "react";
import Hello from "./Hello";
import { PageHeader } from "react-bootstrap";

require('../css/fullstack.css');
var $ = require('jquery');

import HeaderBackgroundImage from '../images/header.jpg';
import '../css/fullstack.css';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: '',
            allotment: '',
            fsp: '',
            sc: '',
            isp: '',
            bc: '',
            cptr: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    addHeaderImg() {
        let headerBg = new Image();
        headerBg.src = HeaderBackgroundImage;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render () {
        return (
            <PageHeader>
                <div className='header-contents'>
                {this.addHeaderImg()}
                <Hello name='Rimini' />
                </div>
            </PageHeader>
        );
    }
}
