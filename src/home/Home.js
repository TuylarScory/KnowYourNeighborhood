import React, { Component } from 'react'
import './Home.css';
import store from '../img/Neighbor_know.jpg';

export class Home extends Component {
    render() {
        return (
            <div class="container my-5">
                <div clas="row">
                    <img src={store} alt="Online Store"></img>
                </div>
            </div>
        )
    }
}

export default Home
