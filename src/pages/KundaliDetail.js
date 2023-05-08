import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppFooter, AppSidebar, Noti } from '../component'
import { BACKEND_API } from '../store/WebApiUrl';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
export default function KundaliDetail() {
    const [matchData, setMatchData] = useState(JSON.parse(localStorage.getItem('kundali')));
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

            await fetch(BACKEND_API + 'pdfdetail/downloadFile', {
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
                                <span className='font-bold text-xl'>Kundli Report </span>
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

                        {/* <div className='row' style={{ display: 'inherit' }}>
                            <div className='col-sm-6 col-md-6'>
                                <div className="col-12 items-center px-4 bg-orange-100 py-2">
                                    <span className='text-xl font-semibold'>Lagna Chart</span>
                                </div>
                                <div style={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: `${matchData?.lagnaChart}` }} />
                            </div>
                            <div className='col-sm-6 col-md-6'>
                                <div className="col-12 items-center px-4 bg-orange-100 py-2">
                                    <span className='text-xl font-semibold'>Navasama Chart</span>
                                </div>
                                <div style={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: `${matchData?.navasamaChart}` }} />
                            </div>
                        </div>
                        <br></br>
                        <div className="flex flex-wrap items-center px-4 bg-orange-100 py-2 w-full">
                            <span className='text-xl font-semibold'>Nakshatra Details</span>
                        </div>
                        <div className="flex flex-col items-center p-2">
                            <div className="flex w-full m-2">
                                <table className="table-auto ">
                                    <tbody>

                                        <tr>
                                            <td className='text-sm font-medium'>Nakshatra Name</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.nakshatra?.name}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Nakshatra Lord</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.nakshatra?.lord.name} ({matchData?.fullData?.nakshatra_details?.nakshatra?.lord.vedic_name})</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Chandra Rasi</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.chandra_rasi?.lord.name}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Chandra Rasi Lord</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.chandra_rasi?.lord.name} ({matchData?.fullData?.nakshatra_details?.chandra_rasi?.lord.vedic_name})</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Soorya Rasi</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.soorya_rasi?.name}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Soorya Rasi Lord</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.soorya_rasi?.lord.name} ({matchData?.fullData?.nakshatra_details?.soorya_rasi?.lord.vedic_name})</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Zodiac</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.zodiac?.name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                        <div className="flex flex-wrap items-center px-4 bg-orange-100 py-2 w-full">
                            <span className='text-xl font-semibold'>Additional Info</span>
                        </div>
                        <div className="flex flex-col items-center p-2">
                            <div className="flex w-full m-2">
                                <table className="table-auto ">
                                    <tbody>

                                        <tr>
                                            <td className='text-sm font-medium'>Deity</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.deity}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Ganam</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.ganam}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Symbol</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.symbol}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Animal Sign</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.animal_sign}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Nadi</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.nadi}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Color</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.color}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Best Direction</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.best_direction}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Syllables</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.syllables}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Birth Stone</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.birth_stone}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Gender</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.gender}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Planet</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.planet}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-sm font-medium'>Enemy Yoni</td>
                                            <td className='text-sm font-medium'>{matchData?.fullData?.nakshatra_details?.additional_info?.enemy_yoni}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                        <div className="flex flex-col px-2 mx-2 mt-4">
                            <span className='font-semibold text-xl text-orange-700'>Yoga Details</span>
                            <br></br>
                            {matchData?.fullData?.yoga_details.map((yog, index) => (<>
                                <span class="font-semibold font-weight-regular text-black text-orange-700">{index + 1}. {yog.name}</span>
                                <h3 class="text-black">{yog.description}</h3>                               
                                {yog?.yoga_list.map((list, inde) => (
                                    <>
                                        <span class="font-weight-regular text-black text-orange-700">{list.name}</span>
                                        <p class="text-black">{list.description}</p>
                                        <br></br>
                                    </>
                                ))}
                            </>
                            ))}
                            <br></br>
                        </div>
                        <div class="alert text-center alert-danger">
                            {matchData?.fullData?.mangal_dosha?.description}
                        </div>
                        <div className="flex flex-col px-2 mx-2 mt-4">
                            <span className='font-semibold text-xl text-orange-700'>Anthardashas Details</span>
                            <br></br>
                            {matchData?.fullData?.dasha_periods.map((dash, index) => (<>
                                <span class="font-semibold font-weight-regular text-black text-orange-700">{index + 1}. Anthardashas In {dash.name} Mahadasha</span>
                                <p class="text-black">Starts on {dash.start.split('T')[0]} - End On {dash.end.split('T')[0]}</p>
                                <br></br>
                                <br></br>


                                {dash.antardasha.map((antardasha, inde) => (
                                    <>
                                        <table>
                                            <thead>
                                                <tr className="alert-success">
                                                    <td>AD</td>
                                                    <td>PD</td>
                                                    <td>Start</td>
                                                    <td>End</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {antardasha?.pratyantardasha.map((pratyan) => (
                                                    <tr>
                                                        <td>{antardasha.name}</td>
                                                        <td>{pratyan.name}</td>
                                                        <td>{pratyan.start.split('T')[0]}</td>
                                                        <td>{pratyan.end.split('T')[0]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                ))}
                            </>
                            ))}
                            <br></br>
                            <br></br>
                        </div> */}


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
        </div >
    )
}
