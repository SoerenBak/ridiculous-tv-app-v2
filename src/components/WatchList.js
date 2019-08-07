import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class WatchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let programs = this.props.programs
        let postedPrograms = programs.filter((elm => {
            let username = localStorage.getItem("username") === elm.poster           
            return (username)
        }))

        let programList = []
        postedPrograms.forEach((elm) => {
            programList.push(<React.Fragment>
                <div className="category">
                    <h2>{elm.title}</h2>
                    <p>{elm.description}</p>
                    <p>Category: {elm.category}</p>
                    <p>Channel: {elm.channel}</p>
                    <p>Schedule: {elm.schedule}</p>
                    <p>Posted by: {elm.poster}</p>
                    <p>Id: {elm._id}</p>
                    <button type="button" onClick={this.handleDeleteInput} class="btn btn-danger">Delete</button>
                </div>
            </React.Fragment>)
        })

        {   
            return (
                <React.Fragment>
                <div>
                    <h2>Your Programs </h2>
                    {programList}
                </div>
                </React.Fragment>
            )
        }
    }
}
