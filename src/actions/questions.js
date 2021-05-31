export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'
export const SELECT_QUESTION = 'SELECT_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function saveQuestionAnswer(savedAnswer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    savedAnswer
  }
}

export function addQuestion(question) {
  return {
    type: ADD_NEW_QUESTION,
    question
  }
}

export function selectQuestion(question) {
  return {
    type: SELECT_QUESTION,
    question
  }
}