import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard'
import Navigation from './components/navigation'
import LoadingBar from 'react-redux-loading'
import { Route } from 'react-router-dom'
import Leaderboard from './components/leaderboard'
import NewQuestion from './components/newquestion'
import Login from './components/login'
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
{/*         <Route path='/login' render={() => (
          <Login />
        )} />
        <Route path='/leaderboard' render={() => (
          <Leaderboard />
        )} />
        <Route path='/new_question' render={() => (
          <NewQuestion />
        )} />
        <Route exact path='/' render={() => (
        this.props.loading === true
          ?       <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
          : <Dashboard />
        )} /> */}
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