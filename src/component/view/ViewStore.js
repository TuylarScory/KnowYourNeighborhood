import React, { Component } from 'react'
import { viewStores } from '../../service/StoreService';
import './ViewStore.css'

export class ViewStore extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
            Stores: [],
            key: ''

        }
    }

    componentDidMount() {

        viewStores()
        .then(response => {

            console.log("All Store from Product Component" + JSON.stringify(response));

            this.setState({
             
                Stores: response
    
            })
        })

    }

    searchChangeHandler = (event) => {

        this.setState({
             
            key: event.target.value

        })
    }

    searchStore = (key) => {
        
        this.props.history.push(`/store/search/${key}`)

    }

    getStore = (sId) => {

        this.props.history.push(`/get/${sId}`)
        
    }

    render() {
        return (
            <div className="App">
                <h1 class="text text-center">WELCOME TO KNOW YOUR NEIGHBORHOOD PORTAL!</h1>
                <h2 className="view">VIEW STORES</h2>

                {/* Customized Search Box */}

                <form class="example" action="">
                    <input type="text" placeholder="Search.." name="search" 
                    value={this.state.key} onChange={this.searchChangeHandler} />
                    <input type="button" value="SEARCH" onClick = { () => this.searchStore(this.state.key) } />
                </form>

                <br></br>
 
                {/* Bootstrap Table */}

                <table class="table table-striped mb-5 container">
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
            </div>
        )
    }
}

export default ViewStore
