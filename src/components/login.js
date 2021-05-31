import { React, Component } from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/shared'
import { Redirect, withRouter } from 'react-router-dom'
import logo from '../logo.svg';

class Login extends Component {

    state = {
        authedUser: '',
        toDashboard: false,
        isDisabled: true
    }

    handleChange = (e) => {
        this.setState({
            authedUser: e.target.value,
            isDisabled: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.setAuthedUser(this.state.authedUser)
        this.setState({
            toDashboard: true
        })
    }

    render() {

        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }

        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <form onSubmit={this.handleSubmit}>
                    <select value={this.state.authedUser} onChange={this.handleChange}>
                        <option value="" defaultValue disabled hidden>Select user</option>
                        {Object.keys(this.props.users).map((user, i) => (
                            <option key={user} value={user}>@{user}</option>
                        ))}
                    </select>
                    <input type="submit" value="Login"  disabled={this.state.isDisabled} />
                </form>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        setAuthedUser: (authedUser) => {
            dispatch(handleLogin(authedUser))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))