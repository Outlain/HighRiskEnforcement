import axios from 'axios'
import axiosRetry from "axios-retry";
import { useEffect, useState } from 'react';

export function Schedule() {
    const [schedule, setSchedule] = useState(null);
    const [scheduleArray, setScheduleArray] = useState(null);

    useEffect(() => {

        const optionsBackUp = {
            method: 'GET',
            url: process.env.REACT_APP_SCHEDULES_OBJECT,
        };

        axiosRetry(axios, {
            retries: 10,
            retryDelay: (retryCount) => {
                return retryCount * 1000;
            }
        }); // retry the request up to 10 times, with a 1 second delay between each retry

        axios.request(optionsBackUp).then(function (response) {
            setSchedule(response.data);
            console.log(response.data);
        }).catch(function (errorBackup) {
            console.error(errorBackup);
        })
    }, []);

    useEffect(() => {
        if (schedule) {
            setScheduleArray(Object.keys(schedule));
        }
    }, [schedule]);

    // if (schedule && scheduleArray) {
    //     schedule && scheduleArray ? scheduleArray.map((item, index) => (
    //         <div key={index}>
    //             <h3>{item.toUpperCase()}</h3>

    //             <p>Random: {schedule.item}</p>

    //         </div>
    //     )) : 'loading';
    // }

    // return (
    //     <section className="Main">
    //         {schedule && scheduleArray ? (
    //             scheduleArray.map((item, index) => (
    //                 <div key={index}>
    //                     <h1>{item.toUpperCase()}</h1>
    //                     {schedule[item].map((item, index) => (
    //                         <div key={index}>
    //                             <h4>{item.name}</h4>
    //                             <h6>{item.random.value ? 'The Schedule is random put down a set numer of hours per location' : 'Set Schedule'}</h6>
    //                             <div>{item.schedule.map((itemEnd, indexEnd) =>
    //                              { itemEnd.length <= 0 ? indexEnd : 'some' }
    //                             )}</div>
    //                         </div>
    //                     ))}
    //                 </div>
    //             ))
    //         ) : (
    //             'loading'
    //         )}
    //     </section>
    // );
    return (
        <section className="Main">
            {schedule && scheduleArray ? (
                scheduleArray.map((item, index) => (
                    <div key={index}>
                        <h1>{item.toUpperCase()}</h1>
                        {schedule[item].map((item, index) => (
                            <div key={index}>
                                <h4>{item.name}</h4>
                                <h6>
                                    {item.random.value
                                        ? 'The Schedule is random put down a set numer of hours per location'
                                        : 'Set Schedule'}
                                </h6>
                                <div className='times'>
                                    {item.schedule.map((itemEnd, indexEnd) =>
                                        <div className='hours'>{indexEnd >= 12 ? `${indexEnd % 12 || 12}PM` : `${indexEnd || 12}AM`} </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                'loading'
            )}
        </section>
    );

}

export default Schedule;
