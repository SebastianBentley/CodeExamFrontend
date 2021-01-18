import facade from './apiFacade';
import React, { useState, useEffect } from "react";
export default function UserActivities() {
    const [data, setData] = useState(null);


    useEffect(() => {
        facade.fetchUserActivities(localStorage.getItem("username")).then(res => setData(res))
            .catch(err => {
                if (err.status) {
                    console.log(err.message);
                }
            });

    }, [])

    const toShow = data ? (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">exerciseDate</th>
                        <th scope="col">exerciseType</th>
                        <th scope="col">timeOfDay</th>
                        <th scope="col">duration</th>
                        <th scope="col">distance</th>
                        <th scope="col">comment</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((x, index) => (
                        <tr key={index}>
                            <td>{x.exerciseDate}</td>
                            <td>{x.exerciseType}</td>
                            <td>{x.timeOfDay}</td>
                            <td>{x.duration}</td>
                            <td>{x.distance}</td>
                            <td>{x.comment}</td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </div >

    ) : ("loading...")

    return (
        <div>
            <h1>Your Activies</h1>
            {toShow}


        </div>
    )

}

