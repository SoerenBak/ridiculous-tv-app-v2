import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
export default class ProgramList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let programss = this.props.programs
        let items = programss.filter((elm => {
            let category = this.props.match.params.category === elm.category
            let channel = this.props.match.params.channel === elm.channel
            return (category && channel)
        }))

        let currentPrograms = []
        items.forEach((elm) => {
            currentPrograms.push(<React.Fragment>
                <Link to={{ pathname: `/programs/${this.props.category}/${elm.channel}/${elm.title}` }}>
                <div className="category">
                    <h2>{elm.title}</h2>
                    <p>{elm.schedule}</p>
                </div>
                </Link>
                <hr></hr>
            </React.Fragment>)
        })

        {
            return (
                <React.Fragment>
                    <h1>{this.props.match.params.category}</h1>
                    <br></br>
                    <h3>Found following programs on {this.props.match.params.channel} </h3>                                         
                    <br></br>
                    <div>
                        {currentPrograms}
                    </div>
                </React.Fragment>
            )
        }
    }
}
