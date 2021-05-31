import React, { Component } from 'react'
import { connect } from 'react-redux'

class Filter extends Component() {

    state = {
        checked: ''
    }

    render() {
        return (
            <form>
                <label>
                    Unanswered:
                    <input
                        name="unanswered"
                        type="checkbox"
                        checked={true}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Answered:
                    <input
                        name="answered"
                        type="checkbox"
                        checked={false}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        )
    }
}

export default connect()(Filter)