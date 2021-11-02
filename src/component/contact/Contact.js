import React, { Component } from 'react'
import './Contact.css'

export class Contact extends Component {
    render() {
        return (
            <div class="App">
                <div class="container my-5 py-3">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 className="text-c"><i>Need Help? Contact Using This :) </i></h3>
                    </div>
                </div>

                <div>
                    <div className="text-box">
                            <h5 className="text-c1"><b>Email : </b> kyn@gmail.com</h5>
                            <h5 className="text-c1"><b>Contact : </b> (+95)48437487384)</h5>
                            <h5 className="text-c1"><b>Address : </b> Yangon</h5>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Contact
