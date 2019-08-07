import React, { Component } from 'react'
export default class Program extends Component {
    constructor(props) {
        super(props)
        this.state = {
            program: this.props.program
        }
    }

    componentDidMount() {
        console.log("program: ", this.state.program)
    }
 
    render() {     
        
        let programss = this.props.programs
        let items = programss.filter((elm => {
            let category = this.props.match.params.category === elm.category
            let channel = this.props.match.params.channel === elm.channel
            let title = this.props.match.params.title === elm.title
            console.log(category)
            return (category && channel && title)
        }))

        let currentPrograms = []
        items.forEach((elm) => {
            currentPrograms.push(<React.Fragment>
                <div className="category">
                    <h2>{elm.title}</h2>
                    <p>{elm.description}</p>
                    <p>Category: {elm.category}</p>
                    <p>Channel: {elm.channel}</p>
                    <p>Schedule: {elm.schedule}</p>
                    <p>Posted by: {elm.poster}</p>
                </div>
            </React.Fragment>)
        })

        let program = this.props.program
            return (
                <React.Fragment>
                    <h1>Chosen Program</h1>
                    <div>
                        {currentPrograms}
                    </div>
                </React.Fragment>
            )        
    }
}
