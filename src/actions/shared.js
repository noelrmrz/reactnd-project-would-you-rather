import { getInitialData } from '../utils/api'
import { receiveUsers, saveUserAnswer, addUserQuestion } from '../actions/users'
import { receiveQuestions, saveQuestionAnswer, addQuestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authuser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
          .then(({users, questions}) => {
              dispatch(receiveUsers(users))
              dispatch(receiveQuestions(questions))
              //dispatch(setAuthedUser(AUTHED_ID))
              dispatch(hideLoading())
          })
    }
}

export function handleLogin(authedUser) {
    return (dispatch) => {
        dispatch(setAuthedUser(authedUser))
    }
}

export function handleLogout(authedUser) {
    return (dispatch) => {
        dispatch(setAuthedUser(authedUser))
    }
}

export function handleAnswer(qid, option) {
    return (dispatch, getState) => {
      const { authedUser } = getState()
      const info = {
        authedUser: authedUser,
        qid,
        answer: option
      }
      _saveQuestionAnswer(info)
          .then(() => {
              dispatch(saveQuestionAnswer(info))
              dispatch(saveUserAnswer(authedUser, qid, option))
          })
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        return _saveQuestion({
            optionOneText: optionOneText,
            optionTwoText: optionTwoText,
            author: authedUser
        })
        .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addUserQuestion(authedUser, question.id))
            })
    }
}