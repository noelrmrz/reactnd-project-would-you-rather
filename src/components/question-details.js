import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswer } from '../actions/shared'
import { formatDate } from '../utils/api'
import { withRouter } from 'react-router-dom'
import { checkForUserVote, getUserVote } from './question'
import Notfound from './notfound'
import logo from '../logo.svg'

class QuestionDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: ''
        }
    }

    radioSelected = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.saveQuestionAnswer(this.state.selectedOption)
    }

    render() {
        const { question } = this.props
        if (question === undefined) {
            return <Notfound />
        }

        const questionAuthor = this.props.users[question.author]
        const { author, id, optionOne, optionTwo, timestamp } = question
        const totalVotes = optionOne.votes.length + optionTwo.votes.length

        return (
            <div>
                <div className="question">
                    <div className='question-header'>
                        <div className='question-details'>
                            <h3>Asked by @{questionAuthor.id}</h3>
                            <p>{formatDate(timestamp)}</p>
                        </div>
                        <img src={questionAuthor.avatarURL} className="avatar" />
                    </div>
                    {checkForUserVote(this.props.authedUser, question) !== true
                        ? <div className="question-body">
                            <h2>Would you rather...</h2>
                            <form className="question-form" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <div className="option">
                                        <input type="radio" value="optionOne" id="optionOne" name="radioAnswer" onChange={this.radioSelected} />
                                        <label htmlFor="optionOne">{optionOne.text}</label>
                                    </div>
                                    <div className="option">
                                        <input type="radio" value="optionTwo" id="optionTwo" name="radioAnswer" onChange={this.radioSelected} />
                                        <label htmlFor="optionTwo">{optionTwo.text}</label>
                                    </div>
                                    <input type="submit" value="submit now" />
                                </fieldset>
                            </form>
                        </div>
                        : <div className="question-body">
                            <h2>Would you rather...</h2>
                            <div className='row'>
                                <div className='question-result-column-image'>
                                    {getUserVote(this.props.authedUser, question) === 1 ? <img src={logo} alt="You voted for this" /> : <img></img>}
                                </div>
                                <div className='question-result-column-data'>
                                    <p>{optionOne.text}</p>
                                    <meter id={optionOne}
                                        min="0" max={totalVotes}
                                        value={optionOne.votes.length}>
                                    </meter>
                                    <p>{optionOne.votes.length} of {totalVotes} votes</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='question-result-column-image'>
                                    {getUserVote(this.props.authedUser, question) === 2 ? <img src={logo} alt="You voted for this" /> : <img></img>}
                                </div>
                                <div className='question-result-column-data'>
                                    <p>{optionTwo.text}</p>
                                    <meter id={optionTwo}
                                        min="0" max={totalVotes}
                                        value={optionTwo.votes.length}>
                                    </meter>
                                    <p>{optionTwo.votes.length} of {totalVotes} votes</p>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    const question = questions[id]

    return {
        authedUser,
        question,
        users
    }
}

function mapDispatchToProps(dispatch, props) {
    const { id } = props.match.params

    return {
        saveQuestionAnswer: (answer) => {
            dispatch(handleAnswer(id, answer))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionDetails))