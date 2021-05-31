import {RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER, ADD_NEW_QUESTION, SELECT_QUESTION } from './types'

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