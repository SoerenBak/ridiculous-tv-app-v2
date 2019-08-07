import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            programs: this.props.programs
        }
        
    }

    render() {
        if (this.props.categories.length) {
            let list = []
            this.props.categories.forEach((elm) => {
                list.push(<React.Fragment>
                    <Link to={{pathname: `/programs/${elm.title}`}}>
                    <div className="category">                    
                        <h2>{elm.title} </h2>
                    </div>
                    </Link>
                </React.Fragment>)
            })

            return (
                <div>
                    <h3>Select TV Category</h3>
                    {list}
                    <hr></hr>
                    <a href="/watchlist">                  
                            <div className="col-lg-12 no-pad">
                                <div className="category">
                                    <h2>Your Watchlist</h2>
                                </div>
                            </div>
                    </a> 
                    <a href="/newprogram">                  
                            <div className="col-lg-12 no-pad">
                                <div className="category">
                                    <h2>Create Program</h2>
                                </div>
                            </div>
                    </a> 
                    <hr></hr>
                </div>
            )
        }
        return <div className="category">
                <h2>No Categories was found</h2>
                <p>Sorry for the inconvenience<br></br>Try again later</p>
                
            </div>
    }
}
