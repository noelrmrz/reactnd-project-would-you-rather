import { React, Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared';

class NewQuestion extends Component {
    
    state = {
        answerOptionOne: '',
        answerOptionTwo: ''
    };

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addQuestion(this.state.answerOptionOne, this.state.answerOptionTwo)
    }

    handleChange = (e) => {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value
        })
    }

    render() {
        return (
            <div className="question">
                <div className='question-header'>
                    <h3>Ask a ridiculous question</h3>
                </div>
                <div className="question-body">
                    <form className='question-form' onSubmit={this.handleSubmit}>
                        <fieldset>
                            <input type='text' placeholder="Option one" name="answerOptionOne" value={this.state.answerOptionOne} onChange={this.handleChange} ></input>
                            <input type='text' placeholder="Option two" name="answerOptionTwo" value={this.state.answerOptionTwo} onChange={this.handleChange} ></input>
                            <input type="submit" value="submit now" />
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {

    return {
        addQuestion: (answerOptionOne, answerOptionTwo) => {
            dispatch(handleAddQuestion(answerOptionOne, answerOptionTwo))
        }
    }
}

export default connect(null, mapDispatchToProps)(NewQuestion)