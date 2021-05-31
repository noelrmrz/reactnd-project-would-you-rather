import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question, { checkForUserVote } from './question'
import { withRouter } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.loadQuestionDetails = this.loadQuestionDetails.bind(this)
    }

    filterList(list, unansweredQuestions) {
        if (unansweredQuestions) {
            return list.filter(question => checkForUserVote(this.props.authedUser, question) === unansweredQuestions)
        }
        else
            return list.filter(question => checkForUserVote(this.props.authedUser, question) === unansweredQuestions)
    }

    loadQuestionDetails(e, questionId) {
        let path = `/questions/` + questionId
        this.props.history.push(path)
    }

    render() {
        return (
            <div>
                <h1 className='header'>Ask Freely</h1>
                <Tabs>
                    <TabList>
                        <Tab>Unanswered questions</Tab>
                        <Tab>Answered questions</Tab>
                    </TabList>

                    <TabPanel>
                        <div className='question-column'>
                            <ul className='dashboard-list'>
                                {this.filterList(this.props.allQuestions, false).map((question) => (
                                    <li key={question.id}>
                                        <Question id={question.id} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='question-column'>
                            <ul className='dashboard-list'>
                                {this.filterList(this.props.allQuestions, true).map((question) => (
                                    <li key={question.id}>
                                        <Question id={question.id} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TabPanel>
                </Tabs>
                {/*                 <div className='row'>
                    <div className='question-column'>
                        <ul className='dashboard-list'>
                            {this.filterList(this.props.allQuestions).map((question) => (
                                <li key={question.id}>
                                    <Question id={question.id} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> */}
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