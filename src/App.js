import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';

import Category from './components/Category'
import Login from './components/Login'
import Program from './components/Program'
import ProgramList from './components/ProgramList'
import NewProgram from './components/NewProgram'
import Channel from './components/Channel'
import AuthService from './components/AuthService'
import WatchList from './components/WatchList';

class App extends Component {

    API_URL = process.env.REACT_APP_API_URL;
    
    constructor(props) {
        super(props);

        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);

        this.state = {
            categories: [],
            channels: [],
            programs: [],
            loggedIn: false,
            token: "",
            res: "",
            username: ""
        };

        this.handleLogout = this.handleLogout.bind(this)
        this.getData = this.getData.bind(this);
        this.getPrograms = this.getPrograms.bind(this);
        this.getChannels = this.getChannels.bind(this);
        this.loginToApp = this.loginToApp.bind(this);
        this.getProgramsFromCategory = this.getProgramsFromCategory.bind(this);      

        this.filterByTitle = this.filterByTitle.bind(this);
        this.postNewProgram = this.postNewProgram.bind(this);
    }


    componentDidMount() { 
        this.setState({
            username: localStorage.getItem("username")
        }) 
              
        this.setState({
            token: localStorage.getItem("token")
        })
        
        console.log("App component has mounted");
        this.getData();
        this.getPrograms();
        this.getChannels();           
    }

    async postNewProgram(title, description, category, channel, schedule) {
        await this.Auth.fetch(`${this.API_URL}/programs/newProgram`, { 
            method: 'POST',          
            body: JSON.stringify({
                title: title,
                description: description,
                category: category,
                channel: channel,
                schedule: schedule,
                poster: localStorage.getItem("username")
            })
        })   
    }

    async deleteProgram(_id) {
        await this.Auth.fetch(`${this.API_URL}/programs/:id`, { 
            method: 'DELETE',          
            body: JSON.stringify({
                _id: _id,              
            })
        })   
    }

    async loginToApp(username, password) {
        console.log(username, password)
        let res = await this.Auth.login(username, password)
        this.setState({
            res: res.msg,
            username: username
        })

        this.setState({
            loggedIn: true,
            token: localStorage.getItem("token")
        })

        localStorage.setItem("username", this.state.username)
    }

    async getData() {
        await this.Auth.fetch(`${this.API_URL}/programs/categories`)
            .then(data => {
                this.setState({
                    categories: data
                });
            })
            .catch(error => {
                console.error("Error when fetching: ", error);
            })
    }

    async getChannels() {
        await this.Auth.fetch(`${this.API_URL}/programs/channels`)
        .then(data => {
            this.setState({
                channels: data
            })
        })
    }

    getPrograms(){
        this.Auth.fetch(`${this.API_URL}/programs`)
        .then(programs => {
            this.setState({
                programs: programs
            })
        })
    }

    getProgramsFromCategory(category) {
        return this.state.programs.filter((elm) => elm.category.includes(category))
    }

    filterByTitle(title){
        return this.state.programs.find((elm) => elm.title === title)
    }

    handleLogout(event) {
        this.Auth.logout()
        this.setState({
            token: ""
        })
    }

    render() {
     
       //let currentUser = localStorage.getItem("username")
        let token = this.state.token
        if (token === 'undefined' || token === "" || !token) {
            return (<Login res={this.state.res} loginToApp={this.loginToApp} />)
        }      

        return (
            <React.Fragment>
                <Router>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <a href="/"> <h1 className="intro">Ridiculous TV APP</h1></a>                              
                                <Switch>
                                    <Route exact path="/newprogram"
                                        render={(props) =>
                                            <React.Fragment>
                                                <NewProgram {...props} 
                                                categories={this.state.categories}
                                                channel={this.state.channels}
                                                programs = {this.state.programs}
                                                postNewProgram={this.postNewProgram} />
                                            </React.Fragment>
                                        }
                                    />
                                </Switch>
                                <Switch>
                                    <Route exact path="/(programs|)"
                                        render={(props) =>
                                            <React.Fragment>
                                                <Category {...props} 
                                                categories={this.state.categories}
                                                programs = {this.state.programs} />
                                            </React.Fragment>
                                        }
                                    />
                                </Switch>
                                <Switch>
                                    <Route exact path={"/programs/:category"}
                                    render={(props) =>
                                        <React.Fragment>
                                        <Channel {...props}  
                                        programs = {this.state.programs}                                      
                                        category = {props.match.params.category}
                                        channels={this.state.channels}
                                        />                                        
                                        </React.Fragment>
                                    }
                                    />
                                </Switch>

                                <Switch>
                                    <Route exact path={"/programs/:category/:channel"}
                                    render={(props) => 
                                    <React.Fragment>
                                        <ProgramList {...props}
                                        programs = {this.state.programs}
                                        category = {props.match.params.category}
                                        channel = {props.match.params.channel}
                                        />                                       
                                    </React.Fragment>}
                                    />
                                </Switch>

                                <Switch>
                                    <Route exact path={"/programs/:category/:channel/:title"}
                                    render={(props) => 
                                    <React.Fragment>
                                        <Program {...props}
                                        program = {this.filterByTitle(props.match.params.title)}   
                                        programs = {this.state.programs}                                   
                                        category = {props.match.params.category}
                                        channel = {props.match.params.channel}
                                        />                                       
                                    </React.Fragment>}
                                    />
                                </Switch>

                                <Switch>
                                    <Route exact path="/watchlist"
                                        render={(props) =>
                                            <React.Fragment>
                                                <WatchList {...props} 
                                                categories={this.state.categories}
                                                category = {props.match.params.category}
                                                channel={this.state.channel}
                                                programs = {this.state.programs}
                                                 />
                                            </React.Fragment>
                                        }
                                    />
                                </Switch>
                            </div>
                        </div>

                        <footer>             
                            <div className="col-sm-12 no-pad">
                                <p>User: {this.state.username} </p>
                        
                            <a href="/newProgram">                  
                                <button className="btn btn-outline-dark btn-create">Create Program</button>
                            </a>                         
                        
                            <form>
                                <button type="submit" className="btn btn-outline-dark btn-create" onClick={this.handleLogout}>Logout</button>
                            </form>
                            </div>
                    </footer>   
                </div>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
