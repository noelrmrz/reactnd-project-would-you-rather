import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './question'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h3 className='header'>Header 3</h3>
                <ul className='dashboard-list'>
                    {this.props.questionIds.map((id) => (
                        <li key={id}>
                            <Question id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ questions }) {
    return {
        questionIds: Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)