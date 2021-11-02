import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {searchStoreByKey} from '../../service/StoreService';
import './SearchStore.css'

export class SearchStore extends Component {

    constructor(props) {
        super(props)
        
        this.state = {

             key: this.props.match.params.key,
             Stores: []

        }

        
    }

    componentDidMount() {

        searchStoreByKey(this.state.key) 
        .then(response => {

            console.log("Search Store from component" + JSON.stringify(response));
            this.setState({
             
                Stores: response
    
            })
        })
    }

    getStore = (sId) => {

        this.props.history.push(`/get/${sId}`)
        
    }

    render() {
        return (
            <div className="App">
                <h2 class="text text-center m-3">SEARCH STORES</h2>

 
                {/* Bootstrap Table */}

                <table class="table table-striped container">
                    <thead>
                        <tr class="table-danger">
                        <th scope="col">NAME</th>
                        <th scope="col">CONTACT</th>
                        <th scope="col">LOCATION</th>
                        <th scope="col">OPEN HOUR</th>
                        <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Fetch all stores */}
                        {
                            this.state.Stores.map(store => 
                            <tr key={store.storeId}>
                                <td>{store.storeName}</td>
                                <td>{store.contact}</td>
                                <td>{store.location}</td>
                                <td>{store.openHour}</td>
                                <td>
                                    {/* Bootstrap Button */}
                                    <button type="button" class="btn btn-info" onClick={ () => this.getStore(store.storeId)}>GET</button>
                                </td>
                            </tr>
                            )
                        } 
                    </tbody>
                </table>

                <div class="text-center">
                    <Link to="/view" className="link">BACK</Link>
                </div>
            </div>
        )
    }
}

export default SearchStore
