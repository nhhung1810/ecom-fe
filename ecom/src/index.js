import React from 'react';
import ReactDOM from 'react-dom';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";
import './index.css';

import Register from "./authentication/popup.js";

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
        }
    }

    togglePopup = () => {
        // console.log(this);
        let c = this.state.isOpen;
        this.setState({isOpen: !c});
        return;
    } 

    render() {
        
        return (
            <div>
                <button type="button" onClick={this.togglePopup}>Register</button>
                {
                    this.state.isOpen && <Register
                    content={<></>}
                    handleClose={this.togglePopup}
                />}
                <button type="button">Login</button>
                <p className="fill-page"><object data="./images/text.txt" className="fill-page"></object></p>
            </div> 
        )
    }
}

ReactDOM.render(
    <HomePage/>,
    document.getElementById('root')
);

// export default App;
