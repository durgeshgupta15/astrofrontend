import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppFooter, AppSidebar, Noti } from '../component'
import { useNavigate } from 'react-router-dom';
import { BACKEND_API } from '../store/WebApiUrl'

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

export default function ChangePassword() {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/")
  }

  useEffect(() => {
    const saved = localStorage.getItem("myEmail") || "empty";
    if (saved == "empty") {
      navigate("/");
    }
  }, []);


  const [formValuesForPass, setFormValuesForPass] = useState({
    current: "",
    newPass: "",
    repeatPass: "",
  });

  const onChangePass = (e) => {
    setFormValuesForPass({ ...formValuesForPass, [e.target.id]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    var payload = new URLSearchParams();
    payload.append("userId", localStorage.getItem('myUserId'));
    payload.append("currentPassword", formValuesForPass.cpassword);
    payload.append("newPassword", formValuesForPass.npassword);
    payload.append("repeatPassword", formValuesForPass.rpassword);

    await fetch(BACKEND_API + 'user/changePassword', {
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
          Noti({
            status: 'success',
            content: data.message,
            timer: 5000,
            animation: true,
            progress: true,
          })
          document.getElementById("changePasswordForm").reset();
          setFormValuesForPass({ ...formValuesForPass, ['cpassword']: '', ['npassword']: '', ['rpassword']: '' });
        } else {
          Noti({
            status: 'danger',
            content: data.message,
            timer: 5000,
            animation: true,
            progress: true,
          })
          // alert(data.message)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
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

                  <div className="topheadingmy">Change Password </div>

                  <Container fluid>
                    <Row>
                      <Col md="2"></Col>
                      <Col md="8">
                        <Card>
                          <Card.Body>
                            <Form id='changePasswordForm' onSubmit={onSubmit}>
                              <Row>
                                <Col className="pr-1" md="12">
                                  <Form.Group>
                                    <label>Current Password</label>
                                    <Form.Control
                                      placeholder="Current Password"
                                      type="password"
                                      id='cpassword'
                                      required
                                      onChange={onChangePass}
                                      style={{ backgroundColor: "#ffffff", border: "1px solid #ddd" }}
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col className="pr-1" md="6">
                                  <Form.Group>
                                    <label>New Password</label>
                                    <Form.Control
                                      placeholder="New Password"
                                      type="password"
                                      id='npassword'
                                      required
                                      onChange={onChangePass}
                                      style={{ backgroundColor: "#ffffff", border: "1px solid #ddd" }}
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                                <Col className="pr-1" md="6">
                                  <Form.Group>
                                    <label htmlFor="exampleInputEmail1">
                                      Repeat Password
                                    </label>
                                    <Form.Control
                                      placeholder="Repeat Password"
                                      type="password"
                                      id='rpassword'
                                      required
                                      onChange={onChangePass}
                                      style={{ backgroundColor: "#ffffff", border: "1px solid #ddd" }}
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                              </Row>


                              <br></br>
                              <Button
                                className="btn-fill pull-right"
                                type="submit"
                                variant="info"
                              >
                                Change Password
                              </Button>
                              <div className="clearfix"></div>
                            </Form>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md="2"></Col>
                    </Row>
                  </Container>


                </div>
              </div>


              <div className="sidebar">
                <ul>
                  <li>
                    <Link to="/myAccount">
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
                    <Link to="/changePassword" className="active">
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