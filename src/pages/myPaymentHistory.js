import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppFooter, AppSidebar } from '../component'
import { useNavigate } from 'react-router-dom';
import { BACKEND_API } from '../store/WebApiUrl'

export default function MyPaymentHistory() {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/")
  }

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("myEmail") || "empty";
    if (saved == "empty") {
      navigate("/");
    } else {

      var payload = new URLSearchParams();
      payload.append("userId", localStorage.getItem('myUserId'));

      fetch(BACKEND_API + 'user/getUserPaymentHistory', {
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
                  <div className="topheadingmy">My Paymnet History </div>

                  <div class="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="border-0">ID</th>
                          <th className="border-0">Name</th>
                          <th className="border-0">Email</th>
                          <th className="border-0">Phone</th>
                          <th className="border-0">Course Name</th>
                          <th className="border-0">Course Fees</th>
                          <th className="border-0">Course Time</th>
                          <th className="border-0">Payment Id</th>
                          <th className="border-0">Payment status</th>
                          <th className="border-0">Registration Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userList.length > 0 && userList.map((user, index) => {
                          return <tr key={user.name}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.courseName}</td>
                            <td>{user.courseFees}</td>
                            <td>{user.courseTime + " " + user.courseType}</td>
                            <td>{user.PayPalPaymentId}</td>
                            <td>{user.paymentStatus}</td>
                            <td>{user.createdDate.split('T')[0]}</td>
                          </tr>
                        })}

                        {userList.length <= 0 && <tr>
                          <td colSpan={10}>No Record Found</td>
                        </tr>
                        }


                      </tbody>
                    </table>
                  </div>
                </div>
              </div>


              <div className="sidebar">
                <ul>
                  <li>
                    <Link to="/myAccount" >
                      <span className="icon"><i className="fas fa-home"></i></span>
                      <span className="item">Purchased Courses</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/myPaymentHistory" className="active">
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