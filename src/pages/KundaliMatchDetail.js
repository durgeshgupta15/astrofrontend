import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppFooter, AppSidebar, Noti } from '../component'
import { BACKEND_API } from '../store/WebApiUrl';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function KundaliMatchDetail() {
    const [matchData, setMatchData] = useState(JSON.parse(localStorage.getItem('kundaliMatch')));
    useEffect(() => {
        getAllRashi()
    }, [])

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


    function onDocumentLoadSuccess(error) {
        console.log(error)
    }

    const [mobileNo, setmobileNo] = useState();
    const handleChange = (e) => {
        setmobileNo(e.target.value)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (mobileNo.length == 10) {
            var payload = new URLSearchParams();
            payload.append("mobileno", mobileNo);

            await fetch(BACKEND_API + 'pdfdetail/downloadMatchingFile', {
                method: 'POST',
                body: payload,
                rejectUnauthorized: false,
                headers: {},
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status) {
                        Noti({
                            status: 'success',
                            content: "Success",
                            timer: 5000,
                            animation: true,
                            progress: true,
                        })
                    } else {
                        Noti({
                            status: 'danger',
                            content: "Error",
                            timer: 5000,
                            animation: true,
                            progress: true,
                        })
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });

            window.open((BACKEND_API + matchData), "_blank")
        } else {
            alert("Please enter correct mobile no")
        }

    }

    return (
        <div className='bg-[#eeebe7]'>
            <div className="flex ">
                <AppSidebar />
            </div>



            <div className="flex flex-col md:flex-row md:ml-28 md:mr-28 justify-center">

                <div className="flex md:p-10 md:w-2/3 md:mt-28">
                    <div className="flex flex-col bg-white rounded-md shadow w-full">

                        <div className="flex bg-teal-700 rounded-t-md p-4 h-[100px] w-full text-white">
                            <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/5029/5029747.png" />
                            <div className="flex flex-col-3 mx-3">
                                <span className='font-bold text-xl'>Kundli Milan Report </span>
                            </div>
                            <div className="flex flex-col-2 mx-2">
                            </div>
                            <div className="flex flex-col-7 mx-7" style={{ display: "block", width: "71%", textAlign: "end" }} >
                                <form onSubmit={onSubmit}>
                                    <button style={{ float: "right" }} type='submit' class="ml-3 bg-orange-600 px-4 py-2 cursor-pointer rounded-md text-white text-center">Download PDF</button>
                                    <input onChange={(e) => { handleChange(e) }} value={mobileNo} required style={{ height: "40px", width: "300px", float: "right" }} type="number" className='rounded-md p-2 form-control' id='mobileNo' placeholder='Mobile No' />
                                </form>
                            </div>
                        </div>

                        <div
                            style={{
                                width: '100%',
                                height: '100vh',
                            }} >
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                                <Viewer
                                    fileUrl={"https://167.71.232.253:5000/" + matchData}
                                />
                            </Worker>
                        </div>

                        {/* <div className="flex flex-wrap items-center px-4 bg-cyan-700 py-4 w-full">
                            <div className="flex mx-4 my-2 justify-center">
                                <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/145/145867.png" />
                                <div className="flex flex-col mx-2 justify-center">
                                    <span className='font-medium text-white text-sm'>{matchData?.boy_name} </span>
                                    <span className='font-medium text-white text-sm'>{matchData?.boy_dob.split(".00")[0].replaceAll("T", " ")} </span>

                                </div>
                            </div>
                            <div className="flex mx-4 my-2 justify-center">
                                <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/2763/2763444.png" />
                                <div className="flex flex-col mx-2 justify-center">
                                    <span className='font-medium text-white text-sm'>{matchData?.girl_name} </span>
                                    <span className='font-medium text-white text-sm'>{matchData?.girl_dob.split(".00")[0].replaceAll("T", " ")} </span>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-wrap items-center px-4 bg-orange-100 py-2 w-full">
                            <span className='text-xl font-semibold'>Birth Details</span>
                        </div>
                        <div className="flex flex-col items-center p-2">
                            <div className="flex w-full m-2">
                                <table className="table-auto ">
                                    <thead >
                                        <tr>
                                            <th className='text-sm'>#</th>
                                            <th className='text-sm'>Details of Girl</th>
                                            <th className='text-sm'>Details of Boy</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td className='text-sm font-medium'>Nakshatra Name</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.boy_info?.nakshatra?.name}</td>
                                            <td className='text-sm'>{matchData?.fullData?.girl_info?.nakshatra?.name}</td>
                                        </tr>
                                        
                                        <tr>
                                            <td className='text-sm font-medium'>Nakshatra Lord</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.boy_info?.nakshatra?.lord.name} ({matchData?.fullData?.girl_info?.nakshatra?.lord?.vedic_name})</td>
                                            <td className='text-sm'>{matchData?.fullData?.girl_info?.nakshatra?.lord.name} ({matchData?.fullData?.girl_info?.nakshatra?.lord?.vedic_name})</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Rasi Name</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.boy_info?.rasi?.name}</td>
                                            <td className='text-sm'>{matchData?.fullData?.girl_info?.rasi?.name}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Rasi Lord</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.boy_info?.rasi?.lord.name} ({matchData?.fullData?.boy_info?.rasi?.lord?.vedic_name})</td>
                                            <td className='text-sm'>{matchData?.fullData?.girl_info?.rasi?.lord.name} ({matchData?.fullData?.girl_info?.rasi?.lord?.vedic_name})</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>




                        <div className="flex flex-wrap items-center px-4 bg-orange-100 py-2 w-full">
                            <span className='text-xl font-semibold'>Guna Milan Details</span>
                        </div>
                        <div className="flex flex-col items-center p-2">
                            <div className="flex w-full m-2">
                                <table className="table-auto ">
                                    <thead >
                                        <tr>
                                            <th className='text-sm'>#</th>
                                            <th className='text-sm'>Guna</th>
                                            <th className='text-sm'>Boy</th>
                                            <th className='text-sm'>Girl</th>
                                            <th className='text-sm'>Max Points</th>
                                            <th className='text-sm'>Matched Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {matchData?.fullData?.guna_milan?.guna.map((gun, index) => (
                                            <tr key={index}>
                                                <td className='text-sm font-medium'>{index + 1}</td>
                                                <td className='text-sm font-medium'>{gun?.name}</td>
                                                <td className='text-sm'>{gun?.boy_koot}</td>
                                                <td className='text-sm'>{gun?.girl_koot}</td>
                                                <td className='text-sm'>{gun?.maximum_points}</td>
                                                <td className='text-sm'>{gun?.obtained_points} Guna</td>
                                            </tr>
                                        ))}
                                        <tr className="text-large">
                                            <th colSpan="4" className="text-center">Total Guna Milan Points </th>
                                            <th>{matchData?.fullData?.guna_milan?.total_points}</th>
                                            <th>{matchData?.fullData?.guna_milan?.maximum_points}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>

                        <div className="flex flex-col px-2 mx-2 mt-4">
                            <span className='font-semibold text-xl text-orange-700'>Guna Milan Detailed Interpretation</span>
                            <br></br>
                            {matchData?.fullData?.guna_milan?.guna.map((gun, index) => (
                                <div key={index}>
                                    <span className="font-weight-regular text-black">{index + 1}. {gun?.name}</span>
                                    <p className="text-black">{gun?.description}</p>
                                    <br></br>
                                </div>
                            ))}
                            <br></br>
                        </div>


                        <div className="flex flex-col justify-center items-center m-4 bg-green-50 rounded-md p-2    ">
                            <img src="../../assets/images/shaadi.png" />
                            <span className='text-2xl font-semibold'>Total Match Points {matchData?.fullData?.guna_milan?.total_points} out of {matchData?.fullData?.guna_milan?.maximum_points}</span>
                        </div>

                        <div className="flex flex-col px-2 mx-2 mt-4">
                            <span className='font-semibold text-xl text-orange-700'>Boy Mangal Dosha </span>
                            <p className="alert alert-danger">
                                {matchData?.fullData?.boy_mangal_dosha_details?.description}
                            </p>
                        </div>

                        <div className="flex flex-col px-2 mx-2 mt-4">
                            <span className='font-semibold text-xl text-orange-700'>Boy Mangal Dosha  </span>
                            <p className="alert alert-danger">
                                {matchData?.fullData?.girl_mangal_dosha_details?.description}
                            </p>
                        </div>

                        <div className="flex flex-col px-2 mx-2 mt-4">
                            <span className='font-semibold text-xl text-orange-700'>Exceptions  </span>
                            <p className="alert alert-danger">
                                {matchData?.fullData?.exceptions}
                            </p>
                        </div>

                        <div className="flex flex-col px-2 mx-2 mt-4">
                            <span className='font-semibold text-xl text-orange-700'>Kundli Matching Conclusion </span>
                            <div className="mb-5 alert text-center alert-success">
                                {matchData?.fullData?.message?.description}
                            </div>
                        </div>
                         */}
                    </div>

                </div>

                <div className=" lg:flex  md:mt-10 p-2 md:w-1/4 ">
                    <div className="flex flex-col">

                        <div className="flex flex-col items-center justify-center w-full font-serif">
                            <span className='text-xl font-medium mt-[100px]'>Detailed Kundli Matching by Renowned Astrologer</span>
                            <span className='text-sm font-medium mt-[5px]'>Get 20+ pages descriptive Ashta Kuta Kundli Match Report telling you about the pros and cons of the relationship between ashwani and ritika</span>
                            <span className='bg-orange-600 px-4 py-2 cursor-pointer hover:bg-orange-700 rounded-md shadow text-white text-center mt-4 w-1/2 md:w-full'>Get Detailed Report</span>
                            <img src="../../assets/images/happy-ganesh-chaturthi-celebration-greeting-card-png.png" alt="" />

                        </div>


                        <div className="flex justify-center w-full font-serif">
                            <span className='text-xl font-medium mt-[20px]'>Free Daily Horoscope</span>
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
