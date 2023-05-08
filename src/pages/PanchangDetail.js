import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppFooter, AppSidebar } from '../component'
import { BACKEND_API } from '../store/WebApiUrl';

export default function PanchangDetail() {
    // const navigate = useNavigate();
    useEffect(() => {
        getTodayPanchang()
        getAllRashi()
    }, [])

    const [panchang, setPanchang] = useState([]);
    const getTodayPanchang = async () => {
        let url = BACKEND_API + "user/getTodayPanchang";
        let data = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "" // <-- Post parameters
        })
        let parsedData = await data.json();
        setPanchang(parsedData.data);
    }

    const [rashi, setRahi] = useState([]);
    const getAllRashi = async () => {
        let url = BACKEND_API + "course/getAllRashi";
        let data = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "" // <-- Post parameters
        })
        let parsedData = await data.json();
        setRahi(parsedData.data);
    }


    var today = new Date();
    // function getDate() {
    //     document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    // }


    return (
        <div className='bg-[#eeebe7]'>


            <div className="flex ">
                <AppSidebar />
            </div>



            <div className="flex md:ml-28 md:mr-28 justify-center">

                {Object.keys(panchang).length > 0 &&
                    <div className="flex md:p-10 md:w-2/3 md:mt-28">
                        <div className="flex flex-col bg-white rounded-md shadow w-full">

                            {/* top yellow card */}
                            <div className="flex bg-yellow-500 rounded-t-md p-4 h-[100px] w-full">
                                <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/5922/5922623.png" />
                                <div className="flex flex-col mx-3">
                                    <span className='font-bold text-xl'>Panchang {today.toLocaleString('default', { month: 'long' })} {('0' + today.getDate()).slice(-2)}, {today.getFullYear()} </span>
                                    {/* <input id="date" onChange={getDate} value={today.getFullYear() + '-' + (('0' + (today.getMonth() + 1)).slice(-2)) + '-' + (('0' + today.getDate()).slice(-2))} min={today.getFullYear() + '-' + (('0' + (today.getMonth() + 1)).slice(-2)) + '-' + (('0' + today.getDate()).slice(-2))} name="date" type="date" /> */}
                                    {/* <span className='font-medium'>Jaipur, Rajasthan, India </span> */}
                                </div>
                            </div>

                            {/* sunrise sunset card */}
                            <div className="flex flex-wrap items-center px-4 bg-cyan-700 py-4 w-full">

                                {/* sunrise */}
                                <div className="flex mx-2 my-2 justify-center">
                                    <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/2584/2584049.png" />
                                    <div className="flex flex-col mx-2">
                                        <span className='font-medium text-white text-sm'>Sunrise </span>
                                        <span className='font-medium text-white text-sm'>{panchang?.sunTime.split(" - ")[0]}</span>

                                    </div>
                                </div>
                                {/* sunset */}
                                <div className="flex mx-2 my-2 justify-center">
                                    <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/2924/2924900.png" />
                                    <div className="flex flex-col mx-2">
                                        <span className='font-medium text-white text-sm'>Sunset </span>
                                        <span className='font-medium text-white text-sm'>{panchang?.sunTime.split(" - ")[1]}</span>

                                    </div>
                                </div>

                                {/* moonrise */}
                                <div className="flex mx-2 my-2 justify-center">
                                    <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/581/581601.png" />
                                    <div className="flex flex-col mx-2">
                                        <span className='font-medium text-white text-sm'>Moonrise </span>
                                        <span className='font-medium text-white text-sm'>{panchang?.moonTime.split(" - ")[0]} </span>

                                    </div>
                                </div>


                                {/* moonset */}
                                <div className="flex mx-2 my-2 justify-center">
                                    <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/2387/2387889.png" />
                                    <div className="flex flex-col mx-2">
                                        <span className='font-medium text-white text-sm'>Moonset </span>
                                        <span className='font-medium text-white text-sm'>{panchang?.moonTime.split(" - ")[1]} </span>

                                    </div>
                                </div>

                                {/* ayan uttarayan */}
                                <div className="flex mx-2 my-2 justify-center">
                                    <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/672/672838.png" />
                                    <div className="flex flex-col mx-2">
                                        <span className='font-medium text-white text-sm'> </span>
                                        <span className='font-medium text-white text-sm'>{panchang.fullData.vaara} </span>

                                    </div>
                                </div>
                            </div>





                            <div className="panchang-details">

                                <span className="text-black d-block b">Nakshatra</span>

                                {panchang.fullData.nakshatra.map((nakshatra, index) => (
                                    <span className="text-black d-block"> {nakshatra.name} (Lord: {nakshatra.lord.name}) :  {nakshatra.start.split("+")[0]} - {nakshatra.end.split("+")[0]}</span>
                                ))}



                                <hr />
                                <br></br>

                                <span className="text-black d-block b">Tithi</span>
                                {panchang.fullData.tithi.map((tithi, index) => (
                                    <span className="text-black d-block"> {tithi.name} ({tithi.paksha}) :  {tithi.start.split("+")[0]} - {tithi.end.split("+")[0]}</span>
                                ))}
                                <hr />
                                <br></br>


                                <span className="text-black d-block b">Karana</span>
                                {panchang.fullData.karana.map((karana, index) => (
                                    <span className="text-black d-block"> {karana.name} :  {karana.start.split("+")[0]} - {karana.end.split("+")[0]}</span>
                                ))}
                                <hr />
                                <br></br>


                                <span className="text-black d-block b">Yoga</span>
                                {panchang.fullData.yoga.map((yoga, index) => (
                                    <span className="text-black d-block"> {yoga.name} :  {yoga.start.split("+")[0]} - {yoga.end.split("+")[0]}</span>
                                ))}
                                <hr />
                                <br></br>


                                <table className="table table-bordered">
                                    <tbody>
                                        <tr className="alert-success text-center">
                                            <td colSpan="2">Auspicious Timing</td>
                                        </tr>
                                        {panchang.fullData.auspicious_period.map((auspicious_period, index) => (
                                            <tr>
                                                <td>{auspicious_period.name}</td>
                                                <td>
                                                    {auspicious_period.period.map((period) => (
                                                        <>
                                                            {period.start.split("+")[0] + ' - ' + period.end.split("+")[0]}
                                                            <br></br>
                                                        </>
                                                    ))}
                                                    {/* {auspicious_period.period[0].start.split("+")[0]} - {auspicious_period.period[0].end.split("+")[0]}<br /> */}

                                                </td>
                                            </tr>
                                        ))}

                                        <tr className="alert-danger text-center">
                                            <td colSpan="2">Inauspicious Timing</td>
                                        </tr>
                                        {panchang.fullData.inauspicious_period.map((inauspicious_period, index) => (
                                            <tr>
                                                <td>{inauspicious_period.name}</td>
                                                <td>
                                                    {inauspicious_period.period.map((period) => (
                                                        <>
                                                            {period.start.split("+")[0] + ' - ' + period.end.split("+")[0]}
                                                            <br></br>
                                                        </>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                }

                {/* side div */}
                <div className="hidden md:hidden lg:flex  md:mt-10 p-2 w-1/4 ">
                    <div className="flex flex-col">

                        {/* all rashi */}
                        <div className="flex justify-center w-full font-serif">
                            <span className='text-xl font-medium mt-[100px]'>Free Daily Horoscope</span>
                        </div>

                        <div className="bg-slate-50 flex flex-wrap font-serif justify-center shadow rounded-md pt-2 pb-4 mt-4 mb-[70px] w-full">

                            {rashi.length > 0 && rashi.map((rashidetail, index) => (
                                <Link key={index} to={"../rashiDetail/" + rashidetail.rashiName}>
                                    <div className="flex flex-col m-3 mt-4 cursor-pointer items-center">
                                        <img alt="" className='h-12 w-12' src={rashidetail.rashiImage} />
                                        <span className='font-medium'>{rashidetail.rashiName}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>




            <AppFooter />
        </div>
    )
}
