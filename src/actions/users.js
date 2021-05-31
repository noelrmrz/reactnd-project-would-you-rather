import { ADD_USER_QUESTION, RECEIVE_USERS, USER_ANSWER_QUESTION } from './types'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUserQuestion(authedUser, qid) {
    return {
        type: ADD_USER_QUESTION,
        authedUser,
        qid
    }
}

export function saveUserAnswer(authedUser, qid, optionAnswer) {
    return {
        type: USER_ANSWER_QUESTION,
        authedUser,
        qid,
        optionAnswer
    }
}