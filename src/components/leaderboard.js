import { React, Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {

    render() {
        return (
            <div className="leaderboard">
                <h2 className='header'>Some people have too much free time</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Questions Asked</th>
                            <th>Questions Answered</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.userIds.map((id, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={this.props.users[id].avatarURL} className="avatar" />
                                    <p>@{id}</p>
                                </td>
                                <td>{Object.keys(this.props.users[id].answers).length}</td>
                                <td>{this.props.users[id].questions.length}</td>
                                <td>{Object.keys(this.props.users[id].answers).length +
                                    this.props.users[id].questions.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        userIds: Object.keys(users)
            .sort((a, b) => (Object.keys(users[b].answers).length + users[b].questions.length) -
                (Object.keys(users[a].answers).length + users[a].questions.length)),
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)