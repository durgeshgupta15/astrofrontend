import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppFooter, AppSidebar } from '../component'
import { useNavigate } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css'
// import { Tooltip as ReactTooltip } from 'react-tooltip'
import YouTube from 'react-youtube';
import { BACKEND_API } from '../store/WebApiUrl'

export default function MyAccount() {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/")
  }

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("myEmail") || "empty";
    if (saved === "empty") {
      navigate("/");
    } else {

      var payload = new URLSearchParams();
      payload.append("userId", localStorage.getItem('myUserId'));

      fetch(BACKEND_API + 'user/getUserCourse', {
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
            setUserList(data.data);
          } else {
            alert(data.message)
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  const goToPage = (id) => {
    localStorage.setItem("myPurchaseCourseId", id)
    navigate("/myCourseDetail")
  }
  const goToCourseDetailPage = (id) => {
    navigate("/courseDetail/" + id)
  }


  const addDays = function (days, type, date1) {
    var date = new Date(date1);
    if (type === 'Year') {
      date.setFullYear(date.getFullYear() + Number(days));
    } else if (type === 'Month') {
      date.setMonth(date.getMonth() + Number(days));
    } else if (type === 'Day') {
      date.setDate(date.getDate() + Number(days));
    } else {
      date.setHours(date.getHours() + Number(days));
    }
    return date.toString().split(" GMT")[0];
  }



  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {(isReadMore && text?.length >= 260) ? text?.slice(0, 260) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {text?.length >= 260 && (isReadMore ? "...read more" : " show less")}
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
                          <div className="elementor-widget-container">My Account </div>
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

            <div className="wrapper">
              <div className="section">

                <div className="container" style={{ maxWidth: "95%", minHeight: "700px" }}>
                  <div className="topheadingmy">My Purchased Course </div>


                  <div className="grid md:grid-cols-2 p-2 justify-center">
                    {userList.length > 0 && userList.map((course, index) => {
                      return <div key={index} style={{ boxShadow: "0 0 20px 8px #d0d0d0" }} className=" bg-[#eeebe6] border-0 buttonOfmyVideo mx-2 my-2 p-2 rounded-md ">

                        {/* <YouTube className='w-72 object-cover ml-1 mr-2 rounded-md' videoId={course.courseIFrames.split("v=")[1]} /> */}
                        <img className='w-[200px] object-cover ml-1 mr-2 rounded-md myAccountVideoImg' src={"https://img.youtube.com/vi/" + course.courseIFrames.split("v=")[1] + "/0.jpg"} />
                        
                        <div className="buttonOfmyVideo flex-col mx-2">
                          <span className='font-medium hover:text-orange-400 cursor-pointer text-xl'>{course.courseName}</span>
                          <span className='font-medium text-slate-400 text-sm'>In {course.categoryName.toUpperCase()} Category - {course.totalLesson} Lession</span>
                          {/* <span className='font-medium text-gray-700 text-sm mt-2'>{course.courseDescription}</span> */}
                          <ReadMore className='font-medium text-gray-700 text-sm mt-2'>{course.courseDescription}</ReadMore>
                          <span className='md:hidden text-gray-600 text-2xl font-semibold'><span className='text-sm'>Price:</span> ${course.courseFees}</span>

                          <div className="buttonOfmyVideo">
                            <button onClick={(e) => goToCourseDetailPage(course.courseId)} className='px-2 md:px-4 py-1 bg-orange-500 hover:bg-orange-600 rounded-md shadow-md md:w-40 mt-4 text-white font-medium text-sm'>Learn More</button>
                            <button onClick={(e) => goToPage(course.courseId)} className='px-2 md:px-4 py-1 mx-2 md:mx-4 border-orange-500 border-2 hover:bg-orange-500 hover:text-white rounded-md shadow-md md:w-40 mt-4 text-black font-medium text-sm'>View Lesson</button>
                          </div>
                        </div>

                        <div className="hidden md:flex h-full items-center  text-center p-0 w-32">
                          <div className="flex flex-col">
                            <span className='text-sm text-gray-400'>Price</span>
                            <span className=' text-gray-700 text-3xl font-semibold'>${course.courseFees}</span>
                          </div>

                        </div>

                      </div>
                    })}

                    {userList.length <= 0 && <p className='fa-2x text-amber-600 text-center'>You Didn't Purchased any Courses Yet!</p>}
                  </div>




                  {/* <div className="coursePageList">
                    <div className='row' style={{width:"100%"}}>
                      {userList.length > 0 && userList.map((course, index) => {
                        return (
                          <div key={index} className='col-md-4' style={{ marginBottom: "30px" }}>
                            <div className="card" style={{ boxShadow: "0 0 20px 8px #d0d0d0" }}>
                              <div className="card-body">
                                <h5 className="card-title" style={{ fontWeight: "bold", marginBottom: "0x" }}>{course.courseName}</h5>
                                <h6 style={{ fontSize: "12px" }} className="card-subtitle mb-2 text-muted">In Category {course.categoryName}</h6>


                                <div className='row'>
                                  <div className='col-md-6'>
                                    <span style={{ color: "green", marginRight: "5px", fontWeight: "bold" }}>$</span>
                                    {course.courseFees}
                                  </div>
                                  <div className='col-md-6'>
                                    <i className="fa fa-clock" style={{ color: "green", marginRight: "5px" }}></i>
                                    {course.courseTime} {course.courseType}
                                  </div>
                                </div>

                                <div className='row'>
                                  <div className='col-md-12'>
                                    <span style={{ marginRight: "5px", fontWeight: "bold" }}>Registration Date- </span>
                                    {course.createdDate.split('T')[0]}
                                  </div>
                                  <div className='col-md-12'>
                                    <span style={{ marginRight: "5px", fontWeight: "bold" }}>Expired on- </span>
                                    {addDays(course.courseTime, course.courseType, course.createdDate.split('T')[0])}
                                  </div>
                                </div>

                                <br></br>
                                <button onClick={(e) => goToPage(course.courseId)} className="btn btn-success">View Lesson</button>

                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div> */}



                  {/* <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0">Course Name</th>
                        <th className="border-0">Category Name</th>
                        <th className="border-0">Course Fees</th>
                        <th className="border-0">Course Time</th>
                        <th className="border-0">Registration Date</th>
                        <th className="border-0">Course Expire Date</th>
                        <th className="border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.length > 0 && userList.map((user, index) => {
                        return <tr key={user.name}>
                          <td>{index + 1}</td>
                          <td>{user.courseName}</td>
                          <td>{user.categoryName}</td>
                          <td>{user.courseFees}</td>
                          <td>{user.courseTime + " " + user.courseType}</td>
                          <td>{user.createdDate.split('T')[0]}</td>
                          <td>
                            {addDays(user.courseTime, user.courseType, user.createdDate.split('T')[0])}
                          </td>
                          <td>
                            <ReactTooltip anchorId={"my-elementt" + index} />
                            <i id={"my-elementt" + index} data-tooltip-content="View All Videos" onClick={() => goToPage(user.courseId)} style={{ "color": "blue" }} className="fa fa-eye iframeThum"></i>
                          </td>
                        </tr>
                      })}

                      {userList.length <= 0 && <tr>
                        <td colSpan={8}>No Record Found</td>
                      </tr>
                      }

                    </tbody>
                  </table> */}
                </div>
              </div>


              <div className="sidebar">
                <ul>
                  <li>
                    <Link to="/myAccount" className="active">
                      <span className="icon"><i className="fas fa-home"></i></span>
                      <span className="item">Purchased Courses</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses" className="">
                      <span className="icon"><i className="fas fa-shopping-cart"></i></span>
                      <span className="item">Buy More Courses</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/myPaymentHistory">
                      <span className="icon"><i className="fas fa-desktop"></i></span>
                      <span className="item">Payment History</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/myProfile">
                      <span className="icon"><i className="fas fa-user-friends"></i></span>
                      <span className="item">My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/changePassword">
                      <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
                      <span className="item">Change Password</span>
                    </Link>
                  </li>
                  <li>
                    <a onClick={(e) => logout(e)} >
                      <span className="icon"><i className="fas fa-user-shield"></i></span>
                      <span className="item">Logout</span>
                    </a>
                  </li>

                </ul>
              </div>

            </div>





            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </section>
        </section>
      </div>
      <AppFooter />
    </div>
  )
}