import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question, { checkForUserVote } from './question'
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unanswered: false,
            answered: false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.loadQuestionDetails = this.loadQuestionDetails.bind(this)
    }

    filterList(list) {
        if (this.getFilter() === null) {
            return list
        }
        else {
            return list.filter(question => checkForUserVote(this.props.authedUser, question) === this.getFilter())
        }
    }

    getFilter() {
        if (this.state.answered === true && this.state.unanswered === false) {
            return true;
        }
        else if (this.state.unanswered === true && this.state.answered === false) {
            return false;
        }
        else {
            return null;
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    loadQuestionDetails(e, questionId) {
        let path = `/questions/` + questionId
        this.props.history.push(path)
    }

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
                                    name="unanswered"
                                    type="checkbox"
                                    checked={this.state.unanswered}
                                    onChange={this.handleInputChange} />
                            </label>
                            <label>
                                answered:
                                    <input
                                    name="answered"
                                    type="checkbox"
                                    checked={this.state.answered}
                                    onChange={this.handleInputChange} />
                            </label>
                        </form>
                    </div>
                    <div className='question-column'>
                        <ul className='dashboard-list'>
                            {this.filterList(this.props.allQuestions).map((question) => (
                                <li key={question.id}>
                                    <Question id={question.id} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        allQuestions: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp).map(key => {
                return questions[key]
            }),
        authedUser: authedUser
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))