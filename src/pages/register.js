import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppFooter, AppSidebar, Noti } from '../component'
import { useNavigate } from 'react-router-dom';
import { BACKEND_API } from '../store/WebApiUrl'

export default function Register() {
  const navigate = useNavigate();
  // let history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("")

  const handleChange = (e) => {
    if (e.target.id == 'username') {
      setName(e.target.value)
    }
    else if (e.target.id == 'userphone') {
      setPhone(e.target.value)
    }
    else if (e.target.id == 'useremail') {
      setEmail(e.target.value)
    }
    else {
      setpassword(e.target.value)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();


    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailError = regexp.test(email);
    if (!emailError) {
      Noti({
        status: 'danger',
        content: "Please Enter valid Email",
        timer: 5000,
        animation: true,
        progress: true,
      })
      return true
    }



    const regexp_phone = /^[\+]?[(]?[6-9]{1}[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    var emailError = regexp_phone.test(phone);
    if (!emailError) {
      Noti({
        status: 'danger',
        content: "Please Enter valid Mobile Number",
        timer: 5000,
        animation: true,
        progress: true,
      })
      return true
    }



    var payload = new URLSearchParams();
    payload.append("name", name);
    payload.append("phone", phone);
    payload.append("email", email);
    payload.append("password", password);

    await fetch(BACKEND_API + 'user/register', {
      method: 'POST',
      body: payload,
rejectUnauthorized: false,
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          localStorage.setItem("myUserId", data['data'].intId);
          localStorage.setItem("myName", data['data'].name);
          localStorage.setItem("myEmail", data['data'].email);
          localStorage.setItem("myToken", data['data'].token);
          navigate("/");
        } else {
          Noti({
            status: 'danger',
            content: data.data,
            timer: 5000,
            animation: true,
            progress: true,
          })
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
          <div style={{marginTop:"100px"}} className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-515e5dd">
              <div className="elementor-widget-wrap elementor-element-populated">
                <section className="elementor-section elementor-inner-section elementor-element elementor-element-1b8867c elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                  <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-9f2ceda">
                      <div className="elementor-widget-wrap elementor-element-populated">


                       
                        <div className="elementor-element elementor-element-d3fac80 elementor-widget elementor-widget-text-editor"></div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>



          <section className="elementor-section elementor-inner-section elementor-element elementor-element-be1d051 elementor-section-full_width elementor-section-height-default elementor-section-height-default">

            <div className="content">
              <div className="container">
                <div className="row">
                <div class="col-md-1"></div>
                  <div className="col-md-4">
                    <img src="assets/images/undraw_remotely_2j6y.svg" alt="Image" className="img-fluid" />
                  </div>
                  
                  <div className="col-md-6 contents" style={{ display: "block" }}>
                    <div className="row justify-content-center">
                      <div className="col-md-8">

                      <div style={{textAlign:"start"}} className="elementor-element elementor-element-e3d681a elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                          <div className="elementor-widget-container">Signup </div>
                        </div>

                        <form onSubmit={onSubmit}>
                          <div className="form-group first">
                            <input type="name" onChange={(e) => { handleChange(e) }} value={name} required className="form-control" id="username" placeholder='Full Name' />
                          </div>
                          <br></br>
                          <div className="form-group first">
                            <input type="number" onChange={(e) => { handleChange(e) }} value={phone} required className="form-control" id="userphone" placeholder='Phone Number' />
                          </div>
                          <br></br>
                          <div className="form-group first">
                            <input type="email" onChange={(e) => { handleChange(e) }} value={email} required className="form-control" id="useremail" placeholder='Email' />
                          </div>
                          <br></br>
                          <div className="form-group last mb-4">
                            <input type="password" onChange={(e) => { handleChange(e) }} value={password} required className="form-control" id="password" placeholder='Password' />
                          </div>
                          <div className="d-flex mb-5 align-items-center">
                            <span className="ml-auto">
                              <Link to="/login" className="forgot-pass">Already an Account</Link>
                            </span>
                          </div>
                          <input type="submit" value="Signup" className="btn btn-block btn-primary" />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-1"></div>
                </div>
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