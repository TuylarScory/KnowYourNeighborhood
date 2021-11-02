import React, { Component } from 'react'
import {getStoreById} from '../../service/StoreService';
import './GetStore.css'

export class GetStore extends Component {

    constructor(props) {
        super(props)
    
        this.state = { 

            store: {},
            sid: this.props.match.params.sId

        }
    }

    componentDidMount() {

        getStoreById(this.state.sid)
        .then( (response) => {

            console.log("Get Store by Id from Component" + JSON.stringify(response));
            this.setState({

                store: response
    
            })
        })
    }

    render() {
        return (
            <div className="body">

                <div className="out-card">
                    <h1 class="text text-center">VIEW STORE BY ID</h1>
                </div>

                {/* Bootstrap Card */}

                <div class="card text-white mb-3 bg-danger" className="card">
                    <div class="card-header text-center">VIEW STORE ID : {this.state.store.storeId}</div>
                    <div class="card-body">
                        <h5 class="card-title">Store Name : {this.state.store.storeName}</h5>
                        <h5 class="card-title">Store Contact Number : {this.state.store.contact}</h5>
                        <h5 class="card-title">Store Location : {this.state.store.location}</h5>
                        <h5 class="card-title">Open Hour : {this.state.store.openHour}</h5>
                    </div>
                 </div>
            </div>
        )
    } 
}

export default GetStore
