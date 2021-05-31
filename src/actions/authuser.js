import { SET_AUTHED_USER } from './types'

export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}