import React, { Component } from 'react'
import './AppFooter.css'

export class AppFooter extends Component {
    render() {
        return (
            <div className="footer">


                <div className="second">
                         <a href="/contact" class="button">CONTACT US</a>
                         <a href="/about" class="button">ABOUT US</a>
                        <a href="/tc" class="button">Terms & Conditions</a> 
                    </div>
                                      
                <p>Copyright @ 2021 Know Your Neighborhood | All right reserved</p>

            </div>
        )
    }
}

export default AppFooter
