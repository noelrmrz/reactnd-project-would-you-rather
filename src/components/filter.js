import React, { Component } from 'react'
import { connect } from 'react-redux'

class Filter extends Component() {

    render() {
        return (
            <form>
                <label>
                    Unanswered:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={true}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        )
    }
}

export default connect()(Filter)