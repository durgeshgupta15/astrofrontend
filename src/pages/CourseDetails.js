import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppFooter, AppHeader, AppSidebar } from '../component'
import { BACKEND_API } from '../store/WebApiUrl'
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { PayPalScriptProvider, PayPalButtons, BraintreePayPalButtons } from "@paypal/react-paypal-js";

export default function CourseDetails() {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([])
  const [courseListMain, setCourseListMain] = useState([])
  const [coursePurchased, setCoursePurchased] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    console.log("use effect");
    fetchDetail();
    checkPurchasedOrNot(id)
  }, [])



  const checkPurchasedOrNot = (id) => {
    if (localStorage.getItem('myUserId') != '' && localStorage.getItem('myUserId') != undefined) {
      var payload = new URLSearchParams();
      payload.append("userId", localStorage.getItem('myUserId'));
      payload.append("courseId", id);
      // payload.append("PayPalPaymentId", 'ehfjhUGK13Hggh444uhfkfJKG');
      // payload.append("paymentStatus", 'Completed');
      // payload.append("expDate", '2023-02-25');
      fetch(BACKEND_API + 'course/checkCoursePurchasedOrNot', {
        method: 'POST',
        body: payload,
        rejectUnauthorized: false,
        headers: {
          'userid': localStorage.getItem('myUserId'),
          'token': localStorage.getItem('myToken'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setCoursePurchased(true)
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      // navigate("/login")
      setTimeout(() => {
        setCoursePurchased(false)
      }, 1000);
    }


  }

  const goToPage = () => {
    navigate("/myAccount")
  }
  const goToPageLogin = () => {
    navigate("/login")
  }



  const fetchDetail = async (value) => {
    var payload = new URLSearchParams();
    payload.append("id", id);

    let url = BACKEND_API + "course/getCoursesDetail";
    let data = await fetch(url, {
      method: 'POST',
      rejectUnauthorized: false,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: payload
    })
    let parsedData = await data.json();
    let tempList = [];
    setCourseList([]);
    await parsedData.data.map((element) => {
      tempList.push(element);
      setCourseList(courseList => [...courseList, element]);
      setCourseListMain(courseList => [...courseList, element]);
      console.log(courseList)
    });
  }

  const goToBottom = () => {
    var hh = (document.body.offsetHeight) / 2
    window.scrollTo({
      top: hh,
      behavior: 'smooth',
    });
  };


  const paymentCapture = (data) => {
    console.log(data)
    var payload = new URLSearchParams();
    payload.append("userId", localStorage.getItem('myUserId'));
    payload.append("courseId", id);
    payload.append("PayPalPaymentId", data.id);
    payload.append("paymentStatus", data.status);
    payload.append("paymentAllData", JSON.stringify(data));

    fetch(BACKEND_API + 'course/insertPayment', {
      method: 'POST',
      body: payload,
      rejectUnauthorized: false,
      headers: {
        'userid': localStorage.getItem('myUserId'),
        'token': localStorage.getItem('myToken'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          navigate('/myAccount')
        } else {
          alert(data.message)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="App">
      <AppSidebar />
      <div className=''>


        <section className="bg-[#eeebe6] elementor-element elementor-element-be1d051 elementor-inner-section elementor-section elementor-section-full_width elementor-section-height-default">
          <br></br>
          <br></br>
          <br></br>
          <div style={{ marginTop: "100px" }} className="flex flex-col items-center p-4">
            <span className='font-semibold mt-10 text-center fa-2x'>Watch & learn about the most popular Astrology Video Course</span>
            <span className='font-bold text-4xl mt-3 mb-2 text-center'>{courseList[0]?.courseName}</span>

            <div className='flex flex-col md:flex-row p-4 my-4'>

              <div className='flex-1 p-1'>
                {courseList[0]?.courseImage && <img style={{ width: "auto", height: "auto" }} src={BACKEND_API + courseList[0]?.courseImage} />}
              </div>
              <div className='flex-1 p-1'>
                {courseList[0]?.courseImage1 && <img style={{ width: "auto", height: "auto" }} src={BACKEND_API + courseList[0]?.courseImage1} />}
              </div>
            </div>

            {/* <span className='mt-1 text-xl text-center'>{courseList[0]?.courseDescription}</span> */}
            <span className='text-base my-2' style={{ lineHeight: "30px" }} dangerouslySetInnerHTML={{ __html: `${courseList[0]?.courseDescription}` }}>
            </span>
          </div>


          <div className="flex flex-col md:flex-row p-4 bg-[#eeebe7] my-4">

            <div className="flex-1 bg-gray-600 rounded-md m-2 p-3 shadow-md">
              <div className="flex items-center justify-center">
                <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/5521/5521061.png" alt="" />
                <div className="flex flex-col mx-2 justify-center">
                  <span className='text-white font-semibold text-2xl'>{courseList[0]?.courseTime}</span>
                  <span className='text-white text-sm font-semibold'>{courseList[0]?.courseType}</span>
                </div>
              </div>
            </div>


            <div className="flex-1 bg-gray-600 rounded-md m-2 p-3 shadow-md">
              <div className="flex items-center justify-center">
                <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/3172/3172569.png" alt="" />
                <div className="flex flex-col mx-2 justify-center">
                  <span className='text-white font-semibold text-2xl'>{courseList[0]?.totalLesson}</span>
                  <span className='text-white text-sm font-semibold'>Videos</span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-gray-600 rounded-md m-2 p-3 shadow-md">
              <div className="flex items-center justify-center">
                <img className='h-10 w-10' src="https://cdn-icons-png.flaticon.com/512/888/888878.png" alt="" />
                <div className="flex flex-col mx-2 justify-center">
                  <span className='text-white font-semibold text-2xl'>{courseList[0]?.language}</span>
                  <span className='text-white text-sm font-semibold'>Language</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center flex-1 bg-gray-600 rounded-md m-2 p-3 shadow-md">
              <button onClick={() => goToBottom()} className='px-4 md:px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-orange-500 rounded-full shadow-md md:w-40 text-white font-bold'>${courseList[0]?.courseFees} Only</button>
            </div>

          </div>




          <div className="flex flex-col md:flex-row my-4 mx-4">
            <div className="flex flex-col items-start p-0 md:p-20 md:w-3/4 md:mx-4 ">

              <YouTube className='youTubeVideo' videoId={courseList[0]?.courseIFrames.split("v=")[1]} />

              <span className='font-semibold text-3xl my-1'>Learn Astrology Course</span>
              {/* <span className='font-semibold text-base '>Understand the exquisite harmonization of planets and stars.</span> */}
              {/* <span className='text-base my-4'>The term ‘Astrology’ refers to the study of how stars, planets and other cosmic bodies can influence our daily lives. Often this is believed to be predicted by horoscopes but astrology also refers to people being influenced by constellations and alignments in space.</span> */}
              <span className='text-base my-2' style={{ lineHeight: "30px" }} dangerouslySetInnerHTML={{ __html: `${courseList[0]?.fullDescription}` }}>
              </span>


              {/* <span className='text-3xl font-semibold my-2 mb-5'>Know more About the Basic Astrology Video Course</span> */}
              {/* <button className='px-4 md:px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-orange-500 rounded-full shadow-md text-white font-bold'>Enroll Now At ${courseList[0]?.courseFees} Only</button> */}


              {!coursePurchased && Number(courseList[0]?.courseFees) > 0 && localStorage.getItem('myUserId') > 0 && <div className="flex flex-col items-center mt-20 w-100 mt-4">
                <PayPalScriptProvider options={{ "client-id": "AfgJvrpjM7v0re5dN3Y0E1-lie9zPndq4dw83CdVTqcOSOezPL9CsvHAZC9vmIrqXocUo8QbZhivo1o9" }}>
                  <PayPalButtons
                    style={{ color: "blue", shape: "pill", label: 'pay', tagline: false, layout: 'horizontal', height: 40, width: 100 }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: Number(courseList[0]?.courseFees),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        // console.log(details)
                        paymentCapture(details)
                        // const name = details.payer.name.given_name;
                        // alert(`Transaction completed by ${name}`);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>}

              {!coursePurchased && localStorage.getItem('myUserId') <= 0 &&
                <div className='items-center mt-20 mt-4 text-capitalize w-100' style={{ textAlign: "center" }}>
                  <button onClick={goToPageLogin} style={{ background: "#ba9a63" }} className='m-3 px-4 md:px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-orange-500 rounded-full shadow-md text-white font-bold'>Please Login for Purchase </button>
                </div>
              }




              {coursePurchased && <div className='items-center mt-20 mt-4 text-capitalize w-100' style={{ textAlign: "center" }}>
                <button className='m-3 px-4 md:px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-orange-500 rounded-full shadow-md text-white font-bold'>Course Already Purchased</button>

                <button onClick={goToPage} style={{ background: "#ba9a63" }} className='px-4 md:px-4 py-2 rounded-full shadow-md text-white font-bold'>GO TO MY ACCOUNT</button>
              </div>}






            </div>
            <div className="flex flex-col md:w-1/4 p-4 justify-center">
              <div className="flex px-2 py-3 border-[1px] border-slate-300 rounded-xl my-2">
                <div className="flex items-center justify-center">
                  <img className='h-12 w-12' src="https://cdn-icons-png.flaticon.com/512/2995/2995459.png" alt="" />
                  <div className="flex flex-col mx-3 justify-center">
                    <span className=' font-semibold text-2xl text-blue-600'>One</span>
                    <span className=' text-sm font-semibold text-gray-500'>Live class every month</span>
                  </div>
                </div>
              </div>

              <div className="flex px-2 py-3 border-[1px] border-slate-300 rounded-xl my-2">
                <div className="flex items-center justify-center">
                  <img className='h-12 w-12' src="https://cdn-icons-png.flaticon.com/512/3591/3591226.png" alt="" />
                  <div className="flex flex-col mx-3 justify-center">
                    <span className=' font-semibold text-2xl text-green-600'>Regular</span>
                    <span className=' text-sm font-semibold text-gray-500'>Group Discussion</span>
                  </div>
                </div>
              </div>

              <div className="flex px-2 py-3 border-[1px] border-slate-300 rounded-xl my-2">
                <div className="flex items-center justify-center">
                  <img className='h-12 w-12' src="https://cdn-icons-png.flaticon.com/512/4961/4961759.png" alt="" />
                  <div className="flex flex-col mx-3 justify-center">
                    <span className=' font-semibold text-2xl text-amber-600'>Student</span>
                    <span className=' text-sm font-semibold text-gray-500'>Help Desk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </section>

      </div>
      <AppFooter />
    </div>
  )
}
