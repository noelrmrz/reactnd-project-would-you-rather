import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswer } from '../actions/shared'
import { formatDate } from '../utils/api'

class Question extends Component {

    state = {
        selectedOption: ''
    };

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

        const { questionAuthor } = this.props
        const { question } = this.props
        const { author, id, optionOne, optionTwo, timestamp } = question
        const totalVotes = optionOne.votes.length + optionTwo.votes.length

        if (question === null) {
            return <p>This question does not exist.</p>
        }

        return (
            
            <div className="question">
                <div className='question-header'>
                    <div className='question-details'>
                        <h3>Asked by @{questionAuthor.id}</h3>
                        <p>{formatDate(timestamp)}</p>
                    </div>
                    <img src={questionAuthor.avatarURL} className="avatar" />
                </div>
                { checkForUserVote(this.props.authedUser, question) !== true
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
                        <p>{optionOne.text}</p>
                        <meter id={optionOne}
                            min="0" max={totalVotes}
                            value={optionOne.votes.length}>
                        </meter>
                        <p>{optionOne.votes.length} of {totalVotes} votes</p>
                        <p>{optionTwo.text}</p>
                        <meter id={optionTwo}
                            min="0" max={totalVotes}
                            value={optionTwo.votes.length}>
                        </meter>
                        <p>{optionTwo.votes.length} of {totalVotes} votes</p>
                    </div>}
            </div>
        )
    }
}

/*
** Checks to see if the authedUser has voted for the question
** returns true if they are found to have voted
*/
function checkForUserVote(authedUser, question) {
    if (question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser))
        return true
    else
        return false
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const questionAuthor = users[question.author]

    return {
        authedUser,
        question,
        questionAuthor
    }
}

function mapDispatchToProps(dispatch, props) {
    const { id } = props;

    return {
        saveQuestionAnswer: (answer) => {
            dispatch(handleAnswer(id, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)