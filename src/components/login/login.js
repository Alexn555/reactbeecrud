import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { bake_cookie, read_cookie } from 'sfcookies';
import "./login.scss";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            username: "",
            password: "",
            isAuth: false
        };
    }

    saveToStorage() {
        bake_cookie('authorized', true);
    }

    validateForm() {
        return this.state.username.length > 0
            && this.state.password.length > 0
            && this.isValidAuth(this.state.username, this.state.password);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.handleAuth(this.state.username, this.state.password);
    }

    handleAuth(username, password) {
        if (this.isValidAuth(username, password)) {
            this.setState({
                isAuth: true
            });
            this.forceUpdate();
            this.saveToStorage();
        }
    }

    isValidAuth(username, password) {
        const authorized = {
            username: 'admin',
            password: '123'
        };
        if (username === authorized.username && password === authorized.password) {
            return true;
        }
        return false;
    }

    renderRedirect() {
        if (this.state.isAuth) { //refresh to select row
            this.state.isAuth = false;
            return <Redirect to={"/"} />
        }
    }


    loginForm() {
        return (
            <div className="login">
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="username">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <Button
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </div>
        );
    }

    loginFormAuthorized() {
        return this.renderRedirect();
    }

    render() {
        if (!this.state.isAuth) {
           return this.loginForm();
        } else {
           return this.loginFormAuthorized();
        }
    }
}
