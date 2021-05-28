import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './question'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1 className='header'>Ask Freely</h1>
                <div className='row'>
                    <div className='filter-column'>
                        <h4>Filters</h4>
                        <form>
                            <label>
                                Unanswered:
                                    <input
                                    name="isGoing"
                                    type="checkbox"
                                    checked={true}
                                    onChange={this.handleInputChange} />
                            </label>
                        </form>
                    </div>
                    <div className='question-column'>
                        <ul className='dashboard-list'>
                            {this.props.questionIds.map((id) => (
                                <li key={id}>
                                    <Question id={id} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions }) {
    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)