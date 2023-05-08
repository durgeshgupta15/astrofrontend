import React from 'react'
import { useState, useEffect } from 'react';
import { AppFooter, AppHeader, AppSidebar } from '../component'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { BACKEND_API } from '../store/WebApiUrl'

export default function Courses() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(null);
  const [lists, setLists] = useState({ categoryList: [], courseList: [] })
  const [courseList, setCourseList] = useState([])
  const [courseListMain, setCourseListMain] = useState([])


  const selectTab = (e, value, name) => {
    e.preventDefault();
    setSelectedTab(value);
    console.log(value, name)
    let filteredCourse = [...courseListMain]
    if (name != 'All') {
      filteredCourse = filteredCourse.filter(x => x.categoryName == name)
    }
    setCourseList(filteredCourse)
  }
  const fetchCategory = async () => {
    let url = BACKEND_API + "course/getAllCategory";
    let data = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: "userId=1" // <-- Post parameters
    })
    let parsedData = await data.json();


    let tempList = [];
    await parsedData.data.forEach(element => {
      tempList.push(element.categoryName);
    });
    setLists({ categoryList: tempList });
    fetchCourses();
    // console.log(`value of first ${lists.categoryList[1]}`);
  }

  const fetchCourses = async (value) => {
    let url = BACKEND_API + "course/getAllCourses";
    let data = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `userId=1&id=${value}` // <-- Post parameters
    })
    let parsedData = await data.json();
    let tempList = [];
    setCourseList([]);
    await parsedData.data.map((element) => {
      tempList.push(element);
      setCourseList(courseList => [...courseList, element]);
      setCourseListMain(courseList => [...courseList, element]);
    });
  }

  useEffect(() => {
    console.log("use effect");
    fetchCategory();
  }, [])


  const purchaseCourse = (e, id) => {
    e.preventDefault()

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
          'userId': localStorage.getItem('myUserId'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            navigate("/myAccount")
          } else {
            navigate("/courseDetail/" + id)
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      navigate("/login")
    }


  }

  const goToPage = (id) => {
    navigate("/courseDetail/" + id)
  }




  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {(isReadMore && text.length >= 260) ? text.slice(0, 260) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {text.length >= 260 && (isReadMore ? "...read more" : " show less")}
        </span>
      </p>
    );
  };



  return (
    <div className="App">

      <AppSidebar />


      <div data-elementor-type="wp-page" data-elementor-id="13904" className="elementor elementor-13904" >
        <section style={{ padding: "0px" }} className="elementor-section elementor-top-section elementor-element elementor-element-af402d8 bg-product-white elementor-section-boxed elementor-section-height-default elementor-section-height-default">
          <br></br>
          <br></br>
          <div style={{ marginTop: "100px" }} className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-515e5dd">
              <div className="elementor-widget-wrap elementor-element-populated">
                <section className="elementor-section elementor-inner-section elementor-element elementor-element-1b8867c elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                  <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-9f2ceda">
                      <div className="elementor-widget-wrap elementor-element-populated">


                        <div className="elementor-element elementor-element-e3d681a elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                          <div className="elementor-widget-container">Our Courses </div>
                        </div>
                        <div className="elementor-element elementor-element-d3fac80 elementor-widget elementor-widget-text-editor"></div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>



          <section className="elementor-section elementor-inner-section elementor-element elementor-element-be1d051 elementor-section-full_width elementor-section-height-default elementor-section-height-default">

            <div id="myBtnContainer">
              <button className={`btn ${selectedTab == null ? 'active' : ''} `} onClick={(e) => { selectTab(e, null, "All") }}> Show all</button>
              {lists.categoryList.map((element) => {
                return (
                  <>
                    <button key={element} className={`btn ${lists.categoryList.indexOf(element) == selectedTab ? 'active' : ''} `} onClick={(e) => { selectTab(e, lists.categoryList.indexOf(element), element) }}> {element}</button>
                  </>
                )
              })
              }
            </div>

            <br></br>
            <br></br>



            <div className="flex flex-col md:grid md:grid-cols-2 p-2 justify-center">
              {courseList.length > 0 && courseList.map((course, index) => {
                return <div key={index} style={{ boxShadow: "0 0 20px 8px #d0d0d0" }} className=" bg-[#eeebe6] border-0 flex my-2 md:mx-2 p-2 rounded-md ">

                  <img onClick={(e) => goToPage(course.intId)} className='h-100 mr-1 object-cover rounded-md w-[200px]' src={"https://img.youtube.com/vi/" + course.courseIFrames.split("v=")[1] + "/0.jpg"} />
                  {/* <YouTube className=' w-[250px] object-cover mr-1 rounded-md' videoId={course.courseIFrames.split("v=")[1]} /> */}
                  <div className="flex flex-col mx-2 w-full">
                    <span className='font-medium hover:text-orange-400 cursor-pointer text-xl'>{course.courseName}</span>
                    <span className='font-medium text-slate-400 text-sm'>In {course.categoryName.toUpperCase()} Category - {course.totalLesson} Lession</span>

                    <ReadMore className='font-medium text-gray-700 text-sm mt-2'>{course.courseDescription}</ReadMore>
                    {/* <span className='font-medium text-gray-700 text-sm mt-2'>{course.courseDescription}</span> */}
                  
                    <span className='md:hidden text-gray-600 text-2xl font-semibold'><span className='text-sm'>Price:</span> ${course.courseFees}</span>

                    {/* learn more and start learning buttons */}
                    <div className="flex flex-col md:flex-row mt-2">
                      <button onClick={(e) => goToPage(course.intId)} className='px-2 md:px-4 py-1 bg-orange-500 hover:bg-orange-600 rounded-md shadow-md md:w-40 text-white font-medium text-sm m-1'>Learn More</button>
                      <button onClick={(e) => purchaseCourse(e, course.intId)} className='px-2 md:px-4 py-1 md:mx-2  border-orange-500 border-2 hover:bg-orange-500 hover:text-white rounded-md shadow-md md:w-40 m-1 text-black font-medium text-sm'>Start Learning</button>
                    </div>
                  </div>

                  <div className="hidden md:flex h-full w-[200px] items-center  text-center">
                    <div className="flex flex-col">
                      <span className='text-sm text-gray-400'>Price</span>
                      <span className=' text-gray-800 text-2xl font-semibold'>${course.courseFees}</span>
                    </div>

                  </div>

                </div>
              })}
              {courseList.length <= 0 && 
              <p style={{textAlign:"end"}}>No Course Added</p>
              }
            </div>



            {/* <div className="container coursePageList">
              <div className='row'>

                {courseList.length > 0 && courseList.map((course, index) => {
                  return (
                    <div key={index} className='col-md-4' style={{ marginBottom: "30px" }}>
                      <div className="card" style={{ boxShadow: "0 0 20px 8px #d0d0d0" }}>
                        <div className="card-body">
                          <h5 className="card-title" style={{ fontWeight: "bold", marginBottom: "0x" }}>{course.courseName}</h5>
                          <h6 style={{ fontSize: "12px" }} className="card-subtitle mb-2 text-muted">In Category {course.categoryName}</h6>


                          <div className='row'>
                            <div className='col-md-3'>
                              <span style={{ color: "green", marginRight: "5px", fontWeight: "bold" }}>$</span>
                              {course.courseFees}
                            </div>
                            <div className='col-md-4'>
                              <i className="fa fa-clock" style={{ color: "green", marginRight: "5px" }}></i>
                              {course.courseTime} {course.courseType}
                            </div>
                            <div className='col-md-5'>
                              <i className="fa fa-video" style={{ color: "green", marginRight: "5px" }}></i>
                              {course.courseIFrames.split(",").length} Lession
                            </div>
                          </div>

                          <p style={{ marginTop: "7px" }} className="card-text">{course.courseDescription}...</p>

                          <br></br>
                          
                          <PayPalScriptProvider options={{ "client-id": "test" }}>
                            <PayPalButtons style={{ layout: "horizontal" }} />
                          </PayPalScriptProvider>


                          <button onClick={(e) => purchaseCourse(e, course.intId)} className="btn btn-success">Buy Now</button>

                        </div>
                      </div>
                    </div>
                  )
                })}


                {courseList.length <= 0 &&
                  <div className='col-md-12' style={{ marginBottom: "30px", textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>
                    No Course Available
                  </div>
                }



              </div>
            </div> */}


            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </section>
        </section>
      </div>



      {/* <div className="flex flex-col w-full items-center">

        {courseList.map((element) => {
          return <div className="flex flex-col bg-[#eeebe7] shadow-md rounded-md p-3 mx-4 md:w-1/2 mb-5">
            <div className="flex flex-col md:flex-row">
              <span className='flex-1 font-semibold'>{element.courseName}</span>
              <span className='text-gray-500 text-sm'>Course Duration: <span className='text-black font-semibold'>10 Hours</span></span>
            </div>
            <div className="flex my-2">
              <span className='flex-1 text-gray-500 text-sm overflow-hidden text-ellipsis'>Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.</span>
            </div>
            <div className="flex my-2 justify-end">
              <PayPalScriptProvider options={{ "client-id": "test" }}>
                <PayPalButtons style={{ layout: "horizontal" }} />
              </PayPalScriptProvider>
            </div>
          </div>
        })}
      </div> */}

      <AppFooter />
    </div>
  )
}
