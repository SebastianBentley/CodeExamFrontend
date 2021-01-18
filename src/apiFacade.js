import URL from "./settings.js"

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function apiFacade() { /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () => {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () => {
        localStorage.removeItem("jwtToken");
    }


    const login = (user, password) => {
        const options = makeOptions("POST", true, {
            username: user,
            password: password
        });
        return fetch(URL + "/api/login", options).then(handleHttpErrors).then(res => {
            setToken(res.token)
        })
    }

    const fetchData = () => {
        const options = makeOptions("GET", true); // True add's the token
        var base64Url = getToken().split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        if (JSON.parse(atob(base64)).roles === "user") {
            console.log(JSON.parse(atob(base64)))
            return fetch(URL + "/api/member/user", options).then(handleHttpErrors);
        } else {
            return fetch(URL + "/api/member/admin", options).then(handleHttpErrors);
        }
    }


    const makeOptions = (method, addToken, body) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json'
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    const fetchCount = () => {
        const options = makeOptions("GET", true); // True add's the token
        return fetch(URL + "/api/activity/count", options).then(handleHttpErrors);
    }


    const createActivity = (name, city, date, type, time, dur, dis, com) => {
        const options = makeOptions("POST", true, {
            username: name,
            cityname: city,
            exerciseDate: date,
            exerciseType: type,
            timeOfDay: time,
            duration: dur,
            distance: dis,
            comment: com
        });
        return fetch(URL + "/api/activity/createActivity", options).then(handleHttpErrors);
    }

    const registerUser = (name, password, age, weight) => {
        const options = makeOptions("POST", true, {
            username: name,
            password: password,
            age: age,
            weight: weight
        });
        return fetch(URL + "/api/login/registerUser", options).then(handleHttpErrors);
    }

    const fetchUserActivities = (username) => {
        const options = makeOptions("GET", true); // True add's the token
        return fetch(URL + "/api/activity/getActivities/" + username, options).then(handleHttpErrors);
    }

    const fetchWeather = (cityname) => {
        const options = makeOptions("GET", true); // True add's the token
        return fetch(URL + "/api/activity/weather/" + cityname, options).then(handleHttpErrors);
    }

    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        fetchCount,
        registerUser,
        createActivity,
        fetchUserActivities,
        fetchWeather
    }
}
const loginFacade = apiFacade();
export default loginFacade;
