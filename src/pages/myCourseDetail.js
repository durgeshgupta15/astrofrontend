import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppFooter, AppSidebar } from '../component'
import { useNavigate } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { Card, Col, Container, Row } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { BACKEND_API } from '../store/WebApiUrl'

export default function MyCourseDetail() {
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
      payload.append("courseId", localStorage.getItem('myPurchaseCourseId'));

      fetch(BACKEND_API + 'user/getUserCourseDetail', {
        method: 'POST',
        body: payload,
        rejectUnauthorized: false,
        headers: {
          'userid': localStorage.getItem('myUserId'),
          'token': localStorage.getItem('myToken'),
          'courseId': localStorage.getItem('myPurchaseCourseId'),
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
    navigate("/myCourseDetail/" + id)
  }

  Date.prototype.addDays = function (days, type) {
    var date = new Date(this.valueOf());
    if (type == 'Year') {
      date.setDate(date.getFullYear() + days);
    } else if (type == 'Month') {
      date.setDate(date.getMonth() + days);
    } else if (type == 'Day') {
      date.setDate(date.getDate() + days);
    } else {
      date.setDate(date.getHours() + days);
    }
    return date.toString().split(" GMT")[0];
  }

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
                  <div className="topheadingmy">My Course Lesson </div>

                  {/* <Link to="/courses" className="d-inline-block elementor-button-link elementor-button elementor-size-md" style={{ float: "right" }}>Purchse More Courses</Link> */}
                  <div style={{ position: "relative" }}>
                    <Container fluid>
                      <Row>
                        {
                          userList.length > 0 && userList[0].courseIFrames.split(",").map((selectedVideoValue) => [
                            <Col md="6">
                              <YouTube videoId={selectedVideoValue.split("v=")[1]} />
                            </Col>
                          ])
                        }
                      </Row>

                    </Container>
                  </div>


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