import './App.css';
import React, { useState, useEffect } from "react";
import DoLogin from "./login.js"
import AddActivity from "./activity.js"
import UserActivities from "./UserActivities.js"

import {
    Switch,
    Route,
    NavLink,
    useLocation,
    useHistory
} from "react-router-dom";
import facade from './apiFacade';


function App() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    let history = useHistory();
    const goHome = () => {
        history.push("/");
    }
    return (
        <div>
            <Header loginMsg={
                isLoggedIn ? "Logout" : "Login"
            }
                isLoggedIn={isLoggedIn} />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/login">
                    <DoLogin loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} goHome={goHome} />
                </Route>

                {isLoggedIn && (
                    <React.Fragment>
                        <Route exact path="/addActivity">
                            <AddActivity />
                        </Route>
                        <Route exact path="/userActivity">
                            <UserActivities />
                        </Route>
                    </React.Fragment>
                )}
                <Route>
                    <NoMatch />
                </Route>
            </Switch>
        </div>

    );
}

function Header({ isLoggedIn, loginMsg }) {
    return (
        <ul className="header">
            <li>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
            </li>

            {isLoggedIn && (
                <li>
                    <NavLink activeClassName="active" to="/addActivity">Add Activity</NavLink>
                </li>
            )}
            {isLoggedIn && (
                <li>
                    <NavLink activeClassName="active" to="/userActivity">Your Activity</NavLink>
                </li>
            )}

            <li>
                <NavLink activeClassName="active" to="/login">
                    {loginMsg}</NavLink>
            </li>

        </ul>

    )
}


function Home() {
    const [data, setData] = useState(null)
     useEffect(() => {
        setData(null);
        facade.fetchCount().then(res => setData(res)).catch(err => {
            if (err.status) {
                console.log(err.message);
            }
        })
    }, []) 

    const toShow = data ? (
        <div>
            <h2>Total Activies added: {data.count} </h2>
        </div>

    ) : ("loading...")

    return (
        <div>
            <h1>Practial Info</h1>
            <p>Welcome to the Training Logger Website</p>
            <p>To get started, please login or register as a new user, in the Login tab</p>
            {toShow}

        </div>
    )
}



function NoMatch() {
    let location = useLocation();
    return (
        <div>
            <h3>No match for
                <code>{
                    location.pathname
                }</code>
            </h3>
        </div>
    )
}

export default App;
