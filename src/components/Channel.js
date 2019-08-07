import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class Channel extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        console.log("category:" + this.props.category)
    }

    render() {
        let list = []
        this.props.channels.forEach((elm) => {
            list.push(<React.Fragment>
                <Link to={{ pathname: `/programs/${this.props.category}/${elm.channel}` }} style={{ textDecoration: "none", color: "black" }}>
                    <div className="col-sm-12 no-pad">
                        <div className="channel">
                            <h2>{elm.channel}</h2>
                        </div>
                    </div>
                </Link>
            </React.Fragment>)
        })

        return (
            <React.Fragment>
                <div>
                    <h3>Choose TV channel for {this.props.category}</h3>
                        {list}
                </div>
            </React.Fragment>
        )
    }
}
