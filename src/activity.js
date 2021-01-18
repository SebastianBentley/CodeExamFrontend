import facade from './apiFacade';
import React, { useState, useEffect } from "react";
export default function AddActivity() {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    /* const { userInfo, setUserInfo } = useState({
        exerciseDate: "",
        exerciseType: "",
        timeOfDay: "",
        duration: "",
        distance: "",
        comment: ""
    }); */
    const [exerciseDate, setExerciseDate] = useState("");
    const [exerciseType, setExerciseType] = useState("");
    const [timeOfDay, setTimeOfDay] = useState("");
    const [duration, setDuration] = useState("");
    const [distance, setDistance] = useState("");
    const [comment, setComment] = useState("");
    const [city, setCity] = useState("");

    function handleDateChange(event) {
        const value = event.target.value;
        setExerciseDate(value);
    }
    function handleTypeChange(event) {
        const value = event.target.value;
        setExerciseType(value);
    }
    function handleTimeChange(event) {
        const value = event.target.value;
        setTimeOfDay(value);
    }
    function handleDurationChange(event) {
        const value = event.target.value;
        setDuration(value);
    }
    function handleDistanceChange(event) {
        const value = event.target.value;
        setDistance(value);
    }
    function handleCommentChange(event) {
        const value = event.target.value;
        setComment(value);
    }

    function handleCityChange(event) {
        const value = event.target.value;
        setCity(value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        facade.fetchWeather(city).then(res => setData(res))
        .catch(err => {
            if(err.status){
                console.log(err.message);
            }
        })

        facade.createActivity(localStorage.getItem("username"), city, exerciseDate, exerciseType, timeOfDay, duration, distance, comment)
            .catch(err => {
                if (err.status) {
                    setMessage(err.message);
                }
            });
        setMessage("Activity added!");
    }

    const toShow = data ? (
        <div>
            <h2>Weather Conditions</h2>
            <p>Temperature: {data.temperature}C</p>
            <p>Sky: {data.skyText}</p>
            <p>Humidity: {data.humidity}</p>
            <p>Wind: {data.windText}</p>
        </div>
    ) : ("")



    return (
        <div>
            <h1>Add an Activity</h1>
            <form>
                <input placeholder="exercise date" onChange={handleDateChange} />
                <input placeholder="exercise type" onChange={handleTypeChange} />
                <input placeholder="time of day" onChange={handleTimeChange} />
                <input placeholder="duration" onChange={handleDurationChange} />
                <input placeholder="distance" onChange={handleDistanceChange} />
                <input placeholder="city" onChange={handleCityChange} />
                <input placeholder="comment" onChange={handleCommentChange} /><br />
                <button onClick={handleSubmit}>Add Activity</button>
            </form>
            <p>{message}</p>
            {toShow}

        </div>
    )

}

