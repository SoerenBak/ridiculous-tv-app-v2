import React, { Component } from 'react'
import AuthService from './AuthService';

export default class Login extends Component {
    API_URL = 'http://localhost:9000/api';
    constructor(props) {
        super(props)

        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);

        this.state = {
            username: "",
            password: ""
        }

        this.handleLoginInput = this.handleLoginInput.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        
    }

    componentDidMount() {
        console.log("App component has mounted");
    }  

    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleLoginInput(event) {
        event.preventDefault()
        this.props.loginToApp(this.state.username, this.state.password)       
        console.log(this.state.username, this.state.password)
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-md-6 login-screen">
                            <h1>Ridiculous TV APP</h1>
                                <form autoComplete="off">
                                    <div className="form-group">
                                        <label htmlFor="Username">Username</label>
                                        <input value={this.state.username} onChange={this.onChangeUsername} className="form-control" placeholder="Enter Username..." />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input value={this.state.password} onChange={this.onChangePassword} type="password" className="form-control" placeholder="Enter Password..." />
                                        <p>{this.props.res}</p>
                                    </div>
                                        <button type="submit" onClick={this.handleLoginInput} className="btn btn-dark">Login</button>
                                </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
