import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AppFooter, AppSidebar } from '../component'
import { BACKEND_API } from '../store/WebApiUrl';
import { useNavigate } from 'react-router-dom';

export default function RashiDetail() {
  const { rashiId } = useParams()
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  useEffect(() => {
    getAllRashi()
    getAllHoroscope()
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

  const getData = (id) => {
    console.log(id)
    navigate("../../rashiDetail/" + id)
    getAllRashi()
    getAllHoroscope()
  }

  const [horoscope, setHoroscope] = useState([]);
  const getAllHoroscope = async () => {
    let url = BACKEND_API + "user/getAllHoroscope";
    let data = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: "rashi=" + rashiId// <-- Post parameters
    })
    let parsedData = await data.json();
    setHoroscope(parsedData.data);
  }

  var today = new Date();
  // function getDate() {
  //     document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  // }

  return (
    <div>
      <div className="flex">
        <AppSidebar />
      </div>

      {/* top bar with dropdown */}
      <div className="flex h-40 w-full md:mt-[100px] relative">
        <img className='w-full' src="../assets/images/rashibanner.png" />
        <div className="flex flex-col absolute top-10 left-10 md:left-20 w-full h-full font-serif myhoroscopeClass">
          <span className='text-pink-200 text-xl'>Daily</span>
          <div className="flex">
            <span className='text-pink-100 mt-1 text-4xl'>{rashiId} Horoscope</span>
            <select value={rashiId} onChange={(e) => getData(e.target.value)} className="w-32 bg-transparent text-amber-600 border-[1px] border-white rounded-md pl-2 ml-4 mt-2  shadow-md">
              {rashi.length > 0 && rashi.map((rasi, index) => (
                <option value={rasi.rashiName}>{rasi.rashiName} </option>
              ))}
            </select>
            {/* <button className='self-center ml-4 mt-1 border-[1px] border-white w-36 px-4 py-2 rounded-md shadow-xl hover:bg-orange-700  duration-300 font-medium hover:font-medium text-white hover:text-white'>Get Kundli</button> */}

          </div>

        </div>

      </div>


      {/* <div className="flex flex-wrap font-serif m-10 border-b-[1px] border-dotted border-purple-500">
        <span onClick={() => { setSelectedTab(0) }} className={` ${selectedTab == 0 ? "text-purple-700 font-semibold mt-2" : "text-gray-700 mt-2"}  cursor-pointer mx-2`}>YESTERDAY</span>
        <span onClick={() => { setSelectedTab(1) }} className={` ${selectedTab == 1 ? "text-purple-700 font-semibold mt-2" : 'text-gray-700 mt-2'}  cursor-pointer mx-2`}>TODAY</span>
        <span onClick={() => { setSelectedTab(2) }} className={` ${selectedTab == 2 ? "text-purple-700 font-semibold mt-2" : 'text-gray-700 mt-2'}  cursor-pointer mx-2`}>TOMMOROW</span>
        <span onClick={() => { setSelectedTab(3) }} className={` ${selectedTab == 3 ? "text-purple-700 font-semibold mt-2" : 'text-gray-700 mt-2'}  cursor-pointer mx-2`}>WEEKLY</span>
        <span onClick={() => { setSelectedTab(4) }} className={` ${selectedTab == 4 ? "text-purple-700 font-semibold mt-2" : 'text-gray-700 mt-2'}  cursor-pointer mx-2`}>MONTHLY</span>
        <span onClick={() => { setSelectedTab(5) }} className={` ${selectedTab == 5 ? "text-purple-700 font-semibold mt-2" : 'text-gray-700 mt-2'}  cursor-pointer mx-2`}>YEARLY</span>
      </div> */}


      <br></br>
      <br></br>
      <br></br>
      <div className="flex flex-col ml-20 mr-20 font-serif">
        <span className='font-semibold text-orange-900'>{today.toLocaleString('default', { month: 'long' })} {('0' + today.getDate()).slice(-2)}, {today.getFullYear()} </span>
        <span className=''>
          {horoscope?.fullData?.data?.daily_prediction?.prediction}
        </span>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* <div className="flex">
        <span className='text-pink-500 hover:text-pink-600 cursor-pointer ml-20 mb-20 mt-2 font-serif'>Click Here to get detailed report for your Rashi.</span>
      </div> */}

      <AppFooter />
    </div>
  )
}
