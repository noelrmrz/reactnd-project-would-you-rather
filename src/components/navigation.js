import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Logout from '../components/logout'

class Navigation extends Component {

    render() {

        return (
            <nav>
                <ul className="menu">
                    <li className="item">
                        <Link to={{ pathname: '/' }}>Home</Link>
                    </li>
                    <li className="item">
                        <Link to={{ pathname: '/add' }}>New Question</Link>
                    </li>
                    <li className="item">
                        <Link to={{ pathname: '/leaderboard' }}>Leaderboard</Link>
                    </li>
                    {this.props.authedUser === null ? 
                    <li className='item'></li>:
                    <li className="item">Hello @{this.props.authedUser}</li>}
                    
                    <li className="item"><Logout /></li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Navigation)