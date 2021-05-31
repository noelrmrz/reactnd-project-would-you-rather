import Dashboard from "./dashboard"
import Leaderboard from "./leaderboard"
import NewQuestion from './newquestion'
import Login from './login'
import { Switch, Route } from "react-router-dom"
import React, { Fragment } from 'react'
import Navigation from './navigation'
import Notfound from './notfound'
import questionDetails from "./question-details"

function Routes(props) {
    return (
        <div>
            <Switch>
                {
                    // if the user has not logged in show the Login component
                    props.notLoggedIn ? <Route path='/' component={Login} />:
                    <Fragment>
                        {/* Expose the Navbar to all the inner components, but not the login */}
                        <Navigation />
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/leaderboard' component={Leaderboard} />
                        <Route path='/new_question' component={NewQuestion} />
                        <Route path='/questions/:id' component={questionDetails} />
                    </Fragment>
                }
                <Route component={Notfound} />
            </Switch>
        </div>
    )
}

export default Routes