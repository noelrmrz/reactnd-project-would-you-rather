import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER, ADD_NEW_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case SAVE_QUESTION_ANSWER:
            return {
                ...state,
                [action.savedAnswer.qid]: {
                    ...state[action.savedAnswer.qid],
                    [action.savedAnswer.answer]: {
                        ...state[action.savedAnswer.qid][action.answer],
                        votes: state[action.savedAnswer.qid][action.savedAnswer.answer].votes.concat([action.savedAnswer.authedUser])
                    }
                }
            }
        case ADD_NEW_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        default:
            return state
    }
}