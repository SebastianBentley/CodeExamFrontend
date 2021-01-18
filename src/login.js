import loginFacade from "./apiFacade.js"
import React, { useState, useEffect } from "react";


function DoLogin({ loggedIn, setLoggedIn, goHome }) {

    const [errorMsg, setErrorMsg] = useState('');


    const logout = () => {
        loginFacade.logout()
        setLoggedIn(false)
        setErrorMsg('')
        goHome();
    }

    const login = (user, pass) => {
        loginFacade.login(user, pass).then(res => setLoggedIn(true)).catch(err => {
            if (err.status) {
                err.fullError.then(e => setErrorMsg(e.message));
            }
        });
        goHome();
    }


    return (
        <div> {
            !loggedIn ? (
                <div><LogIn login={login} /><p>{errorMsg}</p>
                </div>
            ) : (
                    <div>
                        <LoggedIn />
                        <button onClick={logout}>Logout</button>
                    </div>
                )
        } </div>
    )
}

function LogIn({ login }) {
    const init = {
        username: "",
        password: ""
    };

    const [registername, setRegisterName] = useState("");
    const [registerpassword, setRegisterPass] = useState("");
    const [registerAge, setRegisterAge] = useState("");
    const [registerWeight, setRegisterWeight] = useState("");
    const [message, setMessage] = useState("");
    function handleNameChange(event) {
        const value = event.target.value;
        setRegisterName(value);
    }
    function handlePassChange(event) {
        const value = event.target.value;
        setRegisterPass(value);
    }
    function handleAgeChange(event) {
        const value = event.target.value;
        setRegisterAge(value);
    }

    function handleWeightChange(event) {
        const value = event.target.value;
        setRegisterWeight(value);
    }

    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) => {
        evt.preventDefault();
        localStorage.setItem("username", loginCredentials.username);
        login(loginCredentials.username, loginCredentials.password);
    }

    const performRegister = (evt) => {
        evt.preventDefault();
        loginFacade.registerUser(registername, registerpassword, registerAge, registerWeight);
        setMessage("You can now login with new account!")
    }

    const onChange = (evt) => {
        setLoginCredentials({
            ...loginCredentials,
            [evt.target.id]: evt.target.value
        })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onChange={onChange}>
                <input placeholder="User Name" id="username" />
                <input placeholder="Password" id="password" />
                <button onClick={performLogin}>Login</button>
            </form>

            <h2>Register</h2>
            <form >
                <input placeholder="User Name" id="username" onChange={handleNameChange} />
                <input placeholder="Password" id="password" onChange={handlePassChange} />
                <input placeholder="Age" id="age" onChange={handleAgeChange} />
                <input placeholder="Weight" id="weight" onChange={handleWeightChange} />
                <button onClick={performRegister}>Register</button>
            </form>
            {message}


        </div>
    )

}
function LoggedIn() {
    const [dataFromServer, setDataFromServer] = useState("Loading...")

    useEffect(() => {
        loginFacade.fetchData().then(data => setDataFromServer(data.msg));
    }, [])

   

    return (
        <div>
            <h2>Data Received from server</h2>
            <h3>{dataFromServer}</h3>
        </div>
    )

}

export default DoLogin;