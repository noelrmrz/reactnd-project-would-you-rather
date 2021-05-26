import { React, Component } from 'react'
import { connect } from 'react-redux'
import { handleLogout } from '../actions/shared'
import { withRouter } from 'react-router-dom'

class Logout extends Component {

    state = {
        authedUser: this.props.authedUser
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.logout(null)
        
        const { history } = this.props;
        
        if (history) history.push('/');
        this.setState({
            authedUser: null
        })
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Logout" />
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        logout: (authedUser) => {
            dispatch(handleLogout(authedUser))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout))