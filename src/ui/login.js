import React, { Component } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { login } from '../redux/modules';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        }
    }

    onChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    errorCallback() {
        this.setState({ error: true })
    }

    login() {
        this.props.login({ username: this.state.username, password: this.state.password }, this.errorCallback.bind(this));
    }

    render() {
        return (
            <div>
                <Header>
                    Login Form
                </Header>
                <Form>
                    <Form.Field>
                        <label>Username:</label>
                            <input 
                                name='username' 
                                value={this.state.username} 
                                onChange={this.onChange.bind(this)}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Password:</label>
                            <input 
                                type='password' 
                                name='password' 
                                value={this.state.password} 
                                onChange={this.onChange.bind(this)}
                            />
                    </Form.Field>
                    {
                        this.state.error && (
                            <label> Invalid Credentials, Please try Again! </label>
                        )
                    }
                </Form>
                <br />
                <Button 
                    primary 
                    onClick={this.login.bind(this)}>Login</Button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (user, errorCallback) => dispatch(login(user, errorCallback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);