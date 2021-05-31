import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import './App.css';
import LoadingBar from 'react-redux-loading'
import Routes from './components/routes'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render(){
    return(
      <div className="App">
        <LoadingBar />
        <Routes notLoggedIn={ this.props.loading } />
    </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);