import React, { Component } from 'react'

export default class NewJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            category: "",
            channel: "",
            schedule: "",
            achieved: "",
            refresh: "",
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeChannel = this.onChangeChannel.bind(this);
        this.onChangeSchedule = this.onChangeSchedule.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    onChangeTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    onChangeCategory(event) {
        this.setState({
            category: event.target.value
        })
    }

    onChangeChannel(event) {
        this.setState({
            channel: event.target.value
        })
    }

    onChangeSchedule(event) {
        this.setState({
            schedule: event.target.value
        })
    }

    handleFormInput(event) {
        if (this.state.title.length === 0) {
            event.preventDefault();
            this.setState({
                errTitle: "Missing Values"
            })
        }
        else {
            event.preventDefault();
            this.setState({
                errTitle: ""
            })
        }

        if (this.state.title.length > 0) {
            this.props.postNewProgram(this.state.title, this.state.description, this.state.category, this.state.channel, this.state.schedule)
            this.setState({
                achieved: "Program has been created",
            })
            console.log("Sending All Values")
        }
    }
    refresh() {
        this.setState({
            refresh :""
        })
    }

    render() {
        return (
            <div>
                <h1>Create Program</h1>
                <form>
                    <div className="form-group">
                        <label for="title">Program Title</label>
                        <input type="title" class="form-control" id="title" placeholder="Enter Title..." value={this.state.title} onChange={this.onChangeTitle}></input>
                    </div>
                    <div className="form-group">
                        <label for="description">Program Description</label>
                        <textarea type="description" class="form-control" id="description" placeholder="Enter Description..." value={this.state.description} onChange={this.onChangeDescription}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="category">Program Category</label>
                            <select id="category" value={this.state.category} onChange={this.onChangeCategory} class="form-control">
                                <option selected>Select Category</option>
                                <option>Sport</option>
                                <option>News</option>                      
                                <option>Movies</option>
                            </select>
                    </div>
                    <div class="form-group">
                        <label for="channel">Channel</label>
                            <select id="channel" value={this.state.channel} onChange={this.onChangeChannel} class="form-control">
                                <option selected>Select Channel</option>
                                <option>DR1</option>
                                <option>DR2</option>                      
                                <option>TV2</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <label for="schedule">Program Schedule</label>
                        <input type="schedule" class="form-control" id="schedule" placeholder="Enter Schedule..." value={this.state.schedule} onChange={this.onChangeSchedule}></input>
                    </div>

                    <button type="submit" onClick={this.handleFormInput} class="btn btn-success">Submit</button>
                    <p className="error">{this.state.errTitle}</p>
                        <h4>{this.state.achieved}</h4>
                </form>
            </div>
        )
    }
}


                   